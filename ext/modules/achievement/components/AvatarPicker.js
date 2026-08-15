import { lib, game, ui, get } from '../../../../../../noname.js';
import Cropper from '../../../cropper.esm.js';

/**
 * 头像选择器组件
 * 从 memberCenterPage.js 的 changePicture 函数提取
 * @param {Object} options
 * @param {Object} options.bk - 父容器
 * @param {Object} options.qishuImage - 头像元素，选中后更新其背景图
 * @returns {{ changePicture: Function, destroy: Function }}
 */
export function createAvatarPicker({ bk, qishuImage }) {
    let imageLazyObserver = null;

    /**
     * 销毁组件，清理 IntersectionObserver
     */
    function destroy() {
        if (imageLazyObserver) {
            imageLazyObserver.disconnect();
            imageLazyObserver = null;
        }
    }

    /**
     * 打开头像选择界面
     */
    async function changePicture() {
        let boolSvip = get.xjzh_checkSvipDate();
        if (!boolSvip) {
            game.xjzh_createToast("你还不是会员，无法更换头像，点击SVIP图标购买会员", 'warning');
            return;
        }
        let skins = [];
        let skindir = [
            `${lib.assetURL}/extension/仙家之魂/image/profile/`
        ];

        let additionalList = lib.xjzh_additionalProfile ? lib.xjzh_additionalProfile : [];
        if (Array.isArray(additionalList) && additionalList.length) {
            skindir.push(...additionalList);
        };

        function getImageFilesRecursively(dir) {
            return new Promise((resolve) => {
                game.getFileList(dir, function (dirs, files) {
                    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
                    files.forEach(file => {
                        const ext = file.slice(file.lastIndexOf('.')).toLowerCase();
                        if (imageExtensions.includes(ext)) {
                            skins.push(`${dir}${file}`);
                        }
                    });

                    const subDirPromises = dirs.map(subDir => {
                        return getImageFilesRecursively(`${dir}${subDir}/`);
                    });

                    Promise.all(subDirPromises).then(() => {
                        resolve();
                    });
                }, function () {
                    resolve();
                });
            });
        }

        try {
            for (let i of skindir) {
                await getImageFilesRecursively(i);
            }

            var imageWindow = ui.create.div(bk, {
                zIndex: '1000',
                left: '0',
                width: '100%',
                top: '0',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            });

            var imageContainer = ui.create.div(imageWindow, {
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                overflow: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
                padding: '20px',
                boxSizing: 'border-box',
                backgroundSize: "250%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: "url('" + lib.assetURL + "extension/仙家之魂/css/images/user/skinbg.png')",
            });

            // 图片悬停效果：CSS hover 替代逐元素绑定事件
            const imgStyleId = 'xjzh_member_img_hover';
            if (!document.getElementById(imgStyleId)) {
                const imgStyle = document.createElement('style');
                imgStyle.id = imgStyleId;
                imgStyle.textContent = `
                    .xjzh-member-skin-img {
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                    }
                    .xjzh-member-skin-img:hover {
                        transform: scale(1.05);
                        box-shadow: 0 6px 12px rgba(255,215,0,0.5);
                    }
                `;
                document.head.appendChild(imgStyle);
            }

            // 事件委托：在imageContainer上统一处理img选中
            imageContainer.addEventListener('click', function (e) {
                const img = e.target.closest('img.xjzh-member-skin-img');
                if (!img) return;
                const allImages = imageContainer.querySelectorAll('img.xjzh-member-skin-img');
                allImages.forEach(otherImg => {
                    otherImg.style.border = 'none';
                });
                img.style.border = '3px solid gold';
            });

            var loadingTip = ui.create.div(imageContainer, {
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#FFFFFF',
                fontSize: '24px',
                zIndex: '100'
            });
            loadingTip.innerHTML = '正在加载图片资源...';

            const imagesPerRow = 5;
            const initialRows = 3;
            const initialImageCount = imagesPerRow * initialRows;

            const firstRowImageCount = Math.min(imagesPerRow, skins.length);
            let loadedImagesCount = 0;

            // "添加头像"占位块
            var placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: calc(20% - 24px);
                height: auto;
                margin: 12px;
                aspect-ratio: 1 / 1;
                min-height: 100px;
                position: relative;
            `;

            var addButton = document.createElement('div');
            addButton.style.cssText = `
                width: 100%;
                height: 100%;
                cursor: pointer;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(200, 200, 200, 0.3);
                color: white;
                font-size: 18px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
            `;
            addButton.innerHTML = '+ 添加头像';

            addButton.addEventListener('mouseenter', function () {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 6px 12px rgba(255,215,0,0.5)';
            });

            addButton.addEventListener('mouseleave', function () {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
            });

            addButton.addEventListener('click', function () {
                var fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.style.display = 'none';

                fileInput.addEventListener('change', function (event) {
                    var file = event.target.files[0];
                    if (file) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var imageDataUrl = e.target.result;

                            const cropWindow = ui.create.div(bk, {
                                zIndex: '1002',
                                left: '0',
                                top: '0',
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)'
                            });

                            const cropContainer = ui.create.div(cropWindow, {
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '80%',
                                height: '80%',
                                backgroundColor: 'white'
                            });

                            const cropImage = document.createElement('img');
                            cropImage.src = imageDataUrl;
                            cropImage.style.cssText = 'max-width: 100%; max-height: calc(100% - 60px); display: block; margin: 0 auto;';
                            cropContainer.appendChild(cropImage);

                            const cropper = new Cropper(cropImage, {
                                aspectRatio: 1 / 1,
                                viewMode: 1,
                                autoCropArea: 1,
                            });

                            const buttonContainer = ui.create.div(cropContainer, {
                                position: 'absolute',
                                bottom: '10px',
                                left: '0',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '20px',
                                zIndex: '10'
                            });

                            const confirmButton = ui.create.div(buttonContainer, {
                                width: '80px',
                                height: '36px',
                                left: '40%',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                textAlign: 'center',
                                lineHeight: '36px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                transition: 'background-color 0.3s',
                                zIndex: '10'
                            });
                            confirmButton.innerHTML = '确认';

                            confirmButton.addEventListener('mouseenter', function () {
                                this.style.backgroundColor = '#45a049';
                            });
                            confirmButton.addEventListener('mouseleave', function () {
                                this.style.backgroundColor = '#4CAF50';
                            });

                            confirmButton.addEventListener('click', function () {
                                const canvas = cropper.getCroppedCanvas({
                                    width: 400,
                                    height: 400
                                });

                                if (!canvas) {
                                    game.xjzh_createToast("裁剪失败，请重新尝试", 'error');
                                    return;
                                }

                                const croppedImageUrl = canvas.toDataURL('image/png');

                                game.saveExtensionConfig("仙家之魂", "xjzh_qishuImageUrl", croppedImageUrl);
                                qishuImage.setBackgroundImage(croppedImageUrl);

                                cropper.destroy();
                                cropImage.remove();
                                cropWindow.delete();
                                imageWindow.delete();
                            });

                            const cancelButton = ui.create.div(buttonContainer, {
                                width: '80px',
                                height: '36px',
                                left: '60%',
                                backgroundColor: '#f44336',
                                color: 'white',
                                textAlign: 'center',
                                lineHeight: '36px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                transition: 'background-color 0.3s',
                                zIndex: '10'
                            });
                            cancelButton.innerHTML = '取消';

                            cancelButton.addEventListener('mouseenter', function () {
                                this.style.backgroundColor = '#d32f2f';
                            });
                            cancelButton.addEventListener('mouseleave', function () {
                                this.style.backgroundColor = '#f44336';
                            });

                            cancelButton.addEventListener('click', function () {
                                cropper.destroy();
                                cropImage.remove();
                                cropWindow.delete();
                            });
                        };
                        reader.readAsDataURL(file);
                    }
                });

                document.body.appendChild(fileInput);
                fileInput.click();
                document.body.removeChild(fileInput);
            });

            imageContainer.appendChild(placeholder);
            placeholder.appendChild(addButton);

            const imageElements = [];

            // 共享1个IntersectionObserver实现所有非首屏图片懒加载
            if (!imageLazyObserver) {
                imageLazyObserver = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            obs.unobserve(img);
                        }
                    });
                });
            }

            skins.forEach((imagePath, index) => {
                var imgElement = document.createElement('img');
                imgElement.dataset.src = imagePath;
                imgElement.className = 'xjzh-member-skin-img';

                imgElement.style.cssText = `
                width: calc(20% - 24px);
                height: auto;
                margin: 12px;
                cursor: pointer;
                border-radius: 8px;
                object-fit: cover;
                aspect-ratio: 1 / 1;
            `;

                imageElements.push(imgElement);

                if (index < initialImageCount) {
                    imgElement.src = imgElement.dataset.src;
                    imgElement.onload = imgElement.onerror = () => {
                        loadedImagesCount++;
                        if (loadedImagesCount >= firstRowImageCount) {
                            if (loadingTip.parentNode) {
                                loadingTip.remove();
                            }
                        }
                    };
                } else {
                    imageLazyObserver.observe(imgElement);
                }

                imgElement.imageInfoURL = imagePath;
                let previousCropper = null;
                let previousCropImage = null;

                imgElement.addEventListener('click', function () {
                    imgElement.imageInfoURL = imagePath;

                    const indexURL = this.imageInfoURL;
                    const profilePath = `${lib.assetURL}/extension/仙家之魂/image/profile/`;

                    if (indexURL.startsWith(profilePath)) {
                        game.saveExtensionConfig("仙家之魂", "xjzh_qishuImageUrl", indexURL);
                        qishuImage.setBackgroundImage(indexURL);

                        if (imageWindow && imageWindow.parentNode) {
                            imageWindow.delete();
                        }
                    } else {
                        const cropWindow = ui.create.div(bk, {
                            zIndex: '1001',
                            left: '0',
                            top: '0',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)'
                        });

                        if (previousCropper) {
                            previousCropper.destroy();
                            previousCropImage.remove();
                            previousCropper = null;
                            previousCropImage = null;
                        }

                        const cropContainer = ui.create.div(cropWindow, {
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%',
                            height: '80%',
                            backgroundColor: 'white'
                        });

                        const cropImage = document.createElement('img');
                        cropImage.src = indexURL;
                        cropImage.style.cssText = 'max-width: 100%; max-height: calc(100% - 60px); display: block; margin: 0 auto;';
                        cropContainer.appendChild(cropImage);

                        const cropper = new Cropper(cropImage, {
                            aspectRatio: 1 / 1,
                            viewMode: 1,
                            autoCropArea: 1,
                        });

                        previousCropper = cropper;
                        previousCropImage = cropImage;

                        const buttonContainer = ui.create.div(cropContainer, {
                            position: 'absolute',
                            bottom: '10px',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            zIndex: '10'
                        });

                        const confirmButton = ui.create.div(buttonContainer, {
                            width: '80px',
                            height: '36px',
                            left: '40%',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: '36px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            transition: 'background-color 0.3s',
                            zIndex: '10'
                        });
                        confirmButton.innerHTML = '确认';

                        confirmButton.addEventListener('mouseenter', function () {
                            this.style.backgroundColor = '#45a049';
                        });
                        confirmButton.addEventListener('mouseleave', function () {
                            this.style.backgroundColor = '#4CAF50';
                        });

                        confirmButton.addEventListener('click', function () {
                            const canvas = cropper.getCroppedCanvas({
                                width: 200,
                                height: 200
                            });
                            const croppedImageUrl = canvas?.toDataURL();
                            if (!croppedImageUrl) {
                                if (previousCropper) {
                                    game.xjzh_createToast("裁剪失败，请重新裁剪", 'error');
                                    previousCropper.destroy();
                                    previousCropImage.remove();
                                    previousCropper = null;
                                    previousCropImage = null;
                                    return;
                                }

                                cropWindow.delete();
                                imageWindow.delete();
                                return;
                            }

                            game.saveExtensionConfig("仙家之魂", "xjzh_qishuImageUrl", croppedImageUrl);
                            qishuImage.setBackgroundImage(croppedImageUrl);

                            if (previousCropper) {
                                previousCropper.destroy();
                                previousCropImage.remove();
                                previousCropper = null;
                                previousCropImage = null;
                            }

                            cropWindow.delete();
                            imageWindow.delete();
                        });

                        const cancelButton = ui.create.div(buttonContainer, {
                            width: '80px',
                            height: '36px',
                            left: '60%',
                            backgroundColor: '#f44336',
                            color: 'white',
                            textAlign: 'center',
                            lineHeight: '36px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            transition: 'background-color 0.3s',
                            zIndex: '10'
                        });
                        cancelButton.innerHTML = '取消';

                        cancelButton.addEventListener('mouseenter', function () {
                            this.style.backgroundColor = '#d32f2f';
                        });
                        cancelButton.addEventListener('mouseleave', function () {
                            this.style.backgroundColor = '#f44336';
                        });

                        cancelButton.addEventListener('click', function () {
                            if (previousCropper) {
                                previousCropper.destroy();
                                previousCropImage.remove();
                                previousCropper = null;
                                previousCropImage = null;
                            }
                            cropWindow.delete();
                        });
                    }
                });

            });

            const fragment = document.createDocumentFragment();
            imageElements.forEach(imgElement => {
                fragment.appendChild(imgElement);
            });
            imageContainer.appendChild(fragment);

            var closeButton = ui.create.div(imageWindow, {
                position: 'absolute',
                right: '5%',
                top: '5%',
                width: '5%',
                height: '5%',
                backgroundColor: 'red',
                color: 'white',
                textAlign: 'center',
                lineHeight: '50px',
                cursor: 'pointer',
                borderRadius: '50%',
                fontWeight: 'bold',
                fontSize: '24px'
            });
            closeButton.innerHTML = '×';
            closeButton.addEventListener('click', function () {
                imageWindow.delete();
            });

        } catch (error) {
            console.error('获取图片路径时出错:', error);
        }
    }

    return { changePicture, destroy };
}
