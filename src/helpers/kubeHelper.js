import { convertTimestampToReadableTimeWithTZ } from "./timeHelper";

export const extractKubeNodeDetails = (data) => {
    const latestCondition = data?.status?.conditions?.reduce((prev, current) => {
        return (new Date(prev.lastTransitionTime) > new Date(current.lastTransitionTime)) ? prev : current;
    });

    // Convert RAM from Ki to a more readable format (e.g., GiB)
    const convertKiToGiB = (ki) => parseFloat(ki) / (1024 * 1024);

    // Convert CPU cores to millicores if not already in millicores
    const convertCpuToMillicores = (cpu) => {
        // If CPU is already in millicores (contains 'm'), return the numeric part
        if (cpu.includes('m')) {
            return parseInt(cpu, 10);
        }
        // Otherwise, assume it's in cores and convert to millicores
        return parseInt(cpu, 10) * 1000;
    };

    // Extract the required information
    const result = {
        type: latestCondition.type,
        kernelVersion: data.status.nodeInfo.kernelVersion,
        kubeletVersion: data.status.nodeInfo.kubeletVersion,
        architecture: data.status.nodeInfo.architecture,
        createdAt: convertTimestampToReadableTimeWithTZ(data.metadata.creationTimestamp),
        instanceType: data.metadata.labels["node.kubernetes.io/instance-type"],
        osImage: data.status.nodeInfo.osImage,
        cpu: {
            available: `${convertCpuToMillicores(data.status.allocatable.cpu)}m`,
            total: `${convertCpuToMillicores(data.status.capacity.cpu)}m`
        },
        ram: {
            available: `${convertKiToGiB(data.status.allocatable.memory).toFixed(2)} GiB`,
            total: `${convertKiToGiB(data.status.capacity.memory).toFixed(2)} GiB`
        }
    };

    return result;
}

export const calculateRequestedResourcesForNode = (pods, nodeName) => {
    const { totalRequestedCPU, totalRequestedRAM } = pods.items.reduce((acc, pod) => {
        if (pod.spec.nodeName === nodeName) {
            pod.spec.containers.forEach(container => {
                if (container.resources && container.resources.requests) {
                    if (container.resources.requests.cpu) {
                        const cpuRequest = container.resources.requests.cpu.endsWith('m') ?
                            parseInt(container.resources.requests.cpu, 10) :
                            parseInt(container.resources.requests.cpu, 10) * 1000;
                        acc.totalRequestedCPU += cpuRequest;
                    }
                    if (container.resources.requests.memory) {
                        const ramRequest = container.resources.requests.memory.endsWith('Mi') ?
                            parseInt(container.resources.requests.memory, 10) :
                            container.resources.requests.memory.endsWith('Gi') ?
                                parseInt(container.resources.requests.memory, 10) * 1024 :
                                parseInt(container.resources.requests.memory, 10);
                        acc.totalRequestedRAM += ramRequest;
                    }
                }
            });
        }
        return acc;
    }, { totalRequestedCPU: 0, totalRequestedRAM: 0 });

    return { totalRequestedCPU, totalRequestedRAM };
}

export const eksAddOns = [
    {
        "AddonName": "vpc-cni",
        "Desc": "Enable pod networking within your cluster.",
        "Type": "networking",
        "AddonVersions": [
            {
                "AddonVersion": "v1.18.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.17.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.16.4-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.16.3-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.16.2-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.16.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": true
                    }
                ]
            },
            {
                "AddonVersion": "v1.15.5-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.15.4-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.15.3-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.15.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.15.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.14.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.14.0-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.13.4-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.13.3-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.13.2-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.13.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.6-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.6-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.5-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.5-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.2-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.1-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.5-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.4-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.4-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.4-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.3-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.3-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.3-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.2-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.2-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.2-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.0-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.4-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.4-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.4-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.3-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.3-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.3-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.2-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.2-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.2-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.1-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.1-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.0-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.3-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.3-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.3-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.1-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.1-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.0-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.0-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.7.10-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.7.10-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.7.9-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.7.9-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.7.6-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.7.6-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.7.5-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.7.5-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.6.3-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.6.3-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            }
        ]
    },
    // {
    //     "AddonName": "snapshot-controller",
    //     "Desc": "Enable snapshot functionality in CSI drivers within your cluster.",
    //     "Type": "storage",
    //     "AddonVersions": [
    //         {
    //             "AddonVersion": "v6.3.2-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": true
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v6.2.2-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         }
    //     ]
    // },
    {
        "AddonName": "kube-proxy",
        "Desc": "Enable service networking within your cluster.",
        "Type": "networking",
        "AddonVersions": [
            {
                "AddonVersion": "v1.29.1-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.29.0-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.29.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.29.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": true
                    }
                ]
            },
            {
                "AddonVersion": "v1.28.6-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.28.4-eksbuild.4",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.28.4-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.28.2-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.28.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.27.10-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.27.8-eksbuild.4",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.27.8-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.27.6-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.27.4-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.27.3-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.27.3-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.27.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.26.13-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.26.11-eksbuild.4",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.26.11-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.26.9-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.26.7-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.26.6-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.26.6-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.26.4-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.26.2-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.25.16-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.25.16-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.25.16-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.25.15-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.25.14-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.25.11-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.25.11-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.25.9-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.25.6-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.25.6-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.24.17-eksbuild.8",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.24.17-eksbuild.4",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.24.17-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.24.17-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.24.15-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.24.15-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.24.10-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.24.9-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.24.7-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.17-eksbuild.9",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.17-eksbuild.5",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.17-eksbuild.4",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.17-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.17-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.17-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.16-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.15-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.13-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.8-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.7-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.22.17-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.22.17-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.22.16-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.22.15-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.22.11-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.22.6-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.21.14-eksbuild.5",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.21.14-eksbuild.4",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.21.14-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.21.14-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.21.2-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.20.15-eksbuild.4",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.20.15-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.20.7-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.20.4-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.19.16-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.19.8-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.19.6-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.18.8-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            }
        ]
    },
    // {
    //     "AddonName": "eks-pod-identity-agent",
    //     "Desc":"Install EKS Pod Identity Agent to use EKS Pod Identity to grant AWS IAM permissions to pods through Kubernetes service accounts.",
    //     "Type": "security",
    //     "AddonVersions": [
    //         {
    //             "AddonVersion": "v1.2.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": true
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.1.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.0.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         }
    //     ]
    // },
    {
        "AddonName": "coredns",
        "Desc": "Enable service discovery within your cluster.",
        "Type": "networking",
        "AddonVersions": [
            {
                "AddonVersion": "v1.11.1-eksbuild.6",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.11.1-eksbuild.4",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": true
                    }
                ]
            },
            {
                "AddonVersion": "v1.11.1-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.10.1-eksbuild.7",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.10.1-eksbuild.6",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.10.1-eksbuild.5",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.1-eksbuild.4",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.1-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.1-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.3-eksbuild.11",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.3-eksbuild.10",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.3-eksbuild.9",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.3-eksbuild.7",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.3-eksbuild.6",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.3-eksbuild.5",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.3-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.3-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.7-eksbuild.10",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.7-eksbuild.9",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.7-eksbuild.8",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.7-eksbuild.7",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.7-eksbuild.6",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.7-eksbuild.5",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.7-eksbuild.4",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.7-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.7-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.7-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.4-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.4-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.3-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            }
        ]
    },
    // {
    //     "AddonName": "aws-mountpoint-s3-csi-driver",
    //     "Desc":"Enable Mountpoint for Amazon Simple Storage Service (S3) within your cluster.",
    //     "Type": "storage",
    //     "AddonVersions": [
    //         {
    //             "AddonVersion": "v1.4.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": true
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.3.1-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.3.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.2.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.1.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.0.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         }
    //     ]
    // },
    {
        "AddonName": "aws-guardduty-agent",
        "Desc": "Install EKS Runtime Monitoring add-on within your cluster. Ensure to enable EKS Runtime Monitoring within Amazon GuardDuty.",
        "Type": "security",
        "AddonVersions": [
            {
                "AddonVersion": "v1.5.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": true
                    }
                ]
            },
            {
                "AddonVersion": "v1.4.1-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.4.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.4.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.3.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.3.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.2.0-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.2.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.2.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.1.0-eksbuild.1",
                "Architecture": [
                    "amd64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.0.0-eksbuild.1",
                "Architecture": [
                    "amd64"
                ],
                "Compatibilities": []
            }
        ]
    },
    // {
    //     "AddonName": "aws-efs-csi-driver",
    //     "Desc":"Enable Amazon Elastic File System (EFS) within your cluster.",
    //     "Type": "storage",
    //     "AddonVersions": [
    //         {
    //             "AddonVersion": "v1.7.6-eksbuild.2",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": true
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.7.6-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.7.5-eksbuild.2",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.7.5-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.7.4-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.7.3-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.7.2-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.7.1-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.7.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.5.9-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.5.8-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         }
    //     ]
    // },
    {
        "AddonName": "aws-ebs-csi-driver",
        "Desc": "Enable Amazon Elastic Block Storage (EBS) within your cluster.",
        "Type": "storage",
        "AddonVersions": [
            {
                "AddonVersion": "v1.29.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": true
                    }
                ]
            },
            {
                "AddonVersion": "v1.28.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.27.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.26.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.26.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.25.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.24.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.24.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.2-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.23.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.23.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.22.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.22.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.21.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.20.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": [
                    {
                        "clusterVersion": "1.29",
                        "platformVersions": [
                            "*"
                        ],
                        "defaultVersion": false
                    }
                ]
            },
            {
                "AddonVersion": "v1.19.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.19.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.18.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.17.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.16.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.16.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.15.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.15.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.14.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.14.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.13.0-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.13.0-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.13.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.1-eksbuild.3",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.1-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.12.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.5-eksbuild.2",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.5-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.4-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.11.2-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.10.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.9.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.8.0-eksbuild.0",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.7.0-eksbuild.0",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.6.2-eksbuild.0",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.6.1-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.6.0-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.5.3-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.5.2-eksbuild.1",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            },
            {
                "AddonVersion": "v1.4.0-eksbuild.preview",
                "Architecture": [
                    "amd64",
                    "arm64"
                ],
                "Compatibilities": []
            }
        ]
    },
    // {
    //     "AddonName": "amazon-cloudwatch-observability",
    //     "Desc":"Install CloudWatch Agent and enable Container Insights and Application Signals within your cluster.",
    //     "Type": "observability",
    //     "AddonVersions": [
    //         {
    //             "AddonVersion": "v1.4.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": true
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.3.1-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.3.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.2.2-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": [
    //                 {
    //                     "clusterVersion": "1.29",
    //                     "platformVersions": [
    //                         "*"
    //                     ],
    //                     "defaultVersion": false
    //                 }
    //             ]
    //         },
    //         {
    //             "AddonVersion": "v1.2.1-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": []
    //         },
    //         {
    //             "AddonVersion": "v1.2.0-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": []
    //         },
    //         {
    //             "AddonVersion": "v1.1.1-eksbuild.1",
    //             "Architecture": [
    //                 "amd64",
    //                 "arm64"
    //             ],
    //             "Compatibilities": []
    //         }
    //     ]
    // },
]

export const podConditions = [
    { "reason": "PodScheduled", "type": "success" },
    { "reason": "PodReadyToStartContainers", "type": "success" },
    { "reason": "ContainersReady", "type": "success" },
    { "reason": "Initialized", "type": "success" },
    { "reason": "Ready", "type": "success" },
    { "reason": "Unschedulable", "type": "failure" },
    { "reason": "ContainersNotReady", "type": "failure" },
    { "reason": "PodCompleted", "type": "success" },
    { "reason": "PodFailed", "type": "failure" }
];

export const deploymentReason = [
    {
        "reason": "MinimumReplicasAvailable",
        "type": "success"
    },
    {
        "reason": "MinimumReplicasUnavailable",
        "type": "failure"
    },
    {
        "reason": "NewReplicaSetAvailable",
        "type": "success"
    },
    {
        "reason": "ProgressDeadlineExceeded",
        "type": "failure"
    },
    {
        "reason": "FailedCreate",
        "type": "failure"
    },
    {
        "reason": "FailedDelete",
        "type": "failure"
    },
    {
        "reason": "FailedScaling",
        "type": "failure"
    },
    {
        "reason": "FailedUpdate",
        "type": "failure"
    },
    {
        "reason": "InsufficientReplicas",
        "type": "failure"
    },
    {
        "reason": "Paused",
        "type": "success"
    },
    {
        "reason": "Resumed",
        "type": "success"
    },
    {
        "reason": "RollingBack",
        "type": "failure"
    },
    {
        "reason": "Timeout",
        "type": "failure"
    }
]

export const filterLabels = (labels) => {
    const excludedPatterns = ["kubernetes.io", "k8s.io", "eks.amazonaws.com", "eksctl.io", "pod-template", "helm.sh", "k8s-app", "version", "altinity.com", "controller-revision-hash", "control-plane"];
    const result = [];

    for (const key in labels) {
        if (!excludedPatterns.some(pattern => key.includes(pattern))) {
            result.push(key)
        }
    }

    return result;
}

export const kubernetesEventsReasons = [
    { "reason": "NodeReady", "type": "success" },
    { "reason": "NodeNotReady", "type": "failure" },
    { "reason": "NodeSchedulable", "type": "success" },
    { "reason": "NodeUnschedulable", "type": "failure" },
    { "reason": "Scheduled", "type": "info" },
    { "reason": "Pulled", "type": "info" },
    { "reason": "Created", "type": "success" },
    { "reason": "Started", "type": "success" },
    { "reason": "Killing", "type": "info" },
    { "reason": "Failed", "type": "failure" },
    { "reason": "SuccessfulCreate", "type": "success" },
    { "reason": "FailedCreate", "type": "failure" },
    { "reason": "BackOff", "type": "failure" },
    { "reason": "FailedScheduling", "type": "failure" },
    { "reason": "FailedGetResourceMetric", "type": "failure" },
    { "reason": "Unhealthy", "type": "failure" },
    { "reason": "SuccessfulDelete", "type": "success" },
    { "reason": "FailedDelete", "type": "failure" },
    { "reason": "MinimumReplicasAvailable", "type": "success" },
    { "reason": "MinimumReplicasUnavailable", "type": "failure" },
    { "reason": "NewReplicaSetAvailable", "type": "success" },
    { "reason": "FailedUpdate", "type": "failure" },
    { "reason": "LoadBalancerUpdate", "type": "info" },
    { "reason": "ProvisioningSucceeded", "type": "success" },
    { "reason": "ProvisioningFailed", "type": "failure" },
    { "reason": "ProvisioningInProgress", "type": "info" },
    { "reason": "Completed", "type": "success" },
    { "reason": "NodeSelectionFailed", "type": "failure" },
    { "reason": "ScalingReplicaSet", "type": "info" },
    { "reason": "SuccessfulRescale", "type": "success" },
    { "reason": "FailedRescale", "type": "failure" },
    { "reason": "NamespaceCreation", "type": "success" },
    { "reason": "NamespaceDeletion", "type": "info" }
];