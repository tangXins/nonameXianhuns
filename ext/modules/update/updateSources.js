const repoOwner = 'tangXins';
const repoName = 'nonameXianhuns';
const branch = 'main';

const sources = [
    {
        name: 'jsDelivr',
        baseUrl: `https://cdn.jsdelivr.net/gh/${repoOwner}/${repoName}@${branch}`,
        timeout: 3000,
        priority: 1
    },
    {
        name: 'GitHub',
        baseUrl: `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}`,
        timeout: 10000,
        priority: 2
    }
];

let currentSourceIndex = 0;

async function fetchWithTimeout(url, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response;
    } catch (err) {
        clearTimeout(timeoutId);
        throw err;
    }
}

async function fetchFromSources(filePath, options = {}) {
    const {
        useFallback = true,
        customSourceIndex = null,
        onSourceSwitch = null
    } = options;

    if (customSourceIndex !== null) {
        currentSourceIndex = customSourceIndex;
    }

    let lastError = null;
    let attempts = 0;

    while (attempts < sources.length) {
        const source = sources[currentSourceIndex];
        const url = `${source.baseUrl}/${filePath}`;

        try {
            const response = await fetchWithTimeout(url, source.timeout);
            return response;
        } catch (err) {
            lastError = err;

            if (useFallback && attempts < sources.length - 1) {
                const nextIndex = (currentSourceIndex + 1) % sources.length;

                if (onSourceSwitch) {
                    onSourceSwitch(source.name, sources[nextIndex].name);
                }

                currentSourceIndex = nextIndex;
                attempts++;
                continue;
            }
            break;
        }
    }

    throw lastError;
}

async function fetchManifest() {
    return fetchFromSources('manifest.json').then(response => response.json());
}

async function fetchFile(filePath) {
    return fetchFromSources(filePath).then(response => response.text());
}

async function fetchFileAsBuffer(filePath) {
    return fetchFromSources(filePath).then(response => response.arrayBuffer());
}

function getSourceInfo() {
    return {
        currentSource: sources[currentSourceIndex].name,
        sources: sources.map(s => ({ name: s.name, url: s.baseUrl }))
    };
}

function resetSource() {
    currentSourceIndex = 0;
}

export {
    sources,
    fetchFromSources,
    fetchManifest,
    fetchFile,
    fetchFileAsBuffer,
    getSourceInfo,
    resetSource,
    repoOwner,
    repoName
};
