export const getTaskRevision = (arn) => {
    const parts = arn.split(':');
    return Number(parts[parts.length - 1]);
}

export const extractRegionFromEksArn = (eksArn) => {
    const arnParts = eksArn.split(':');
    if (arnParts.length > 3 && (arnParts[2] === 'eks' || arnParts[2] === 'rds' || arnParts[2] === 'elasticache' || arnParts[2] === 'ecs' || arnParts[2] === 'kafka')) {
        return arnParts[3];
    } else {
        throw new Error('Invalid EKS ARN provided');
    }
}

export const calculateAge = (creationTimestamp) => {
    const elapsed = new Date() - creationTimestamp; // difference in milliseconds
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
}

export const parsePodStatus = (pod) => {
    const name = pod.metadata.name;
    const namespace = pod.metadata.namespace;
    const ready = `${pod.status.containerStatuses?.reduce((acc, cur) => acc + (cur.ready ? 1 : 0), 0) || 0}/${pod.spec.containers.length}`;
    let status = pod.status?.phase;
    const restarts = pod.status.containerStatuses?.reduce((acc, cur) => acc + cur.restartCount, 0) || 0;
    const age = calculateAge(new Date(pod.metadata.creationTimestamp));
    const containerStatuses = pod.status?.containerStatuses

    const conditions = pod.status?.conditions

    let latestCondition = ""
    if (conditions?.length > 0) {
        if (conditions?.sort((a, b) => new Date(b.lastTransitionTime) - new Date(a.lastTransitionTime))[0]?.reason) {
            latestCondition = conditions?.sort((a, b) => new Date(b.lastTransitionTime) - new Date(a.lastTransitionTime))[0]?.reason
        } else {
            latestCondition = conditions?.sort((a, b) => new Date(b.lastTransitionTime) - new Date(a.lastTransitionTime))[0]?.type
        }
    }

    if (containerStatuses?.length > 0 && containerStatuses[0]?.ready === false) {
        const stateKey = Object.keys(containerStatuses[0]?.state)[0];
        status = containerStatuses[0]?.state[stateKey].reason;
    }

    return { name, namespace, ready, status, restarts, age, pod, latestCondition };
}

export const parsePodsStatus = (pods) => {
    return pods?.filter(pod => pod !== null)?.map(pod => {
        return parsePodStatus(pod)
    });
}

export const findLatestTransition = (conditions) => {
    return conditions.reduce((latest, condition) => {
        return new Date(condition.lastTransitionTime) > new Date(latest.lastTransitionTime) ? condition : latest;
    });
}

export const convertECRImageURIToConsoleURL = (ecrImageURI) => {
    const regex = /^(.+)\.dkr\.ecr\.(.+)\.amazonaws\.com\/(.+):.+/;
    const match = ecrImageURI.match(regex);
    if (match) {
        const accountId = match[1];
        const region = match[2];
        const repositoryName = match[3];
        return `https://${region}.console.aws.amazon.com/ecr/repositories/private/${accountId}/${repositoryName}?region=${region}`;
    } else {
        return "Invalid ECR Image URI";
    }
}

export const extractKafkaClusterID = (arn) => {
    return arn?.split(':')?.[5].split('/')?.slice(1)?.join('/');
}

export const extractKafkaNodeID = (arn) => {
    const parts = arn?.split(':')?.[5].split('/');
    return parts?.slice(1, 3)?.join('/');
}

String.prototype.toUpperCaseFirstChar = function () {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
}

String.prototype.toLowerCaseFirstChar = function () {
    return this.substr(0, 1).toLowerCase() + this.substr(1);
}

String.prototype.toUpperCaseEachWord = function (delim) {
    delim = delim ? delim : ' ';
    return this.split(delim).map(function (v) { return v.toUpperCaseFirstChar() }).join(delim);
}

String.prototype.toLowerCaseEachWord = function (delim) {
    delim = delim ? delim : ' ';
    return this.split(delim).map(function (v) { return v.toLowerCaseFirstChar() }).join(delim);
}

export const extractChartName = (chartString) => {
    // Split the input string on the hyphen
    const parts = chartString.split('-');

    // Iterate through the parts and rebuild the name until a version pattern is found
    const nameParts = [];
    for (let part of parts) {
        // Check if the part matches the version pattern (e.g., starts with 'v' followed by numbers or just numbers)
        if (/^v?\d/.test(part)) {
            break;
        }
        nameParts.push(part);
    }

    // Join the name parts back together with hyphens
    return nameParts.join('-');
}

export const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;


export const getBaseAPIUrl = () => {
    return "https://api.gravitycloud.ai"
}