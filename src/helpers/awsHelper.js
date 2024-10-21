export const auroraPostgresTypes = [
    // T3 instances: Burstable, general purpose
    { "instance": "db.t3.medium", "cpu": "2 vCPU", "ram": "4 GB" },
    { "instance": "db.t3.large", "cpu": "2 vCPU", "ram": "8 GB" },
    { "instance": "db.t4g.medium", "cpu": "2 vCPU", "ram": "4 GB" },
    { "instance": "db.t4g.large", "cpu": "2 vCPU", "ram": "8 GB" },

    // R5 instances: Memory optimized
    { "instance": "db.r5.large", "cpu": "2 vCPU", "ram": "16 GB" },
    { "instance": "db.r5.xlarge", "cpu": "4 vCPU", "ram": "32 GB" },
    { "instance": "db.r5.2xlarge", "cpu": "8 vCPU", "ram": "64 GB" },
    { "instance": "db.r5.4xlarge", "cpu": "16 vCPU", "ram": "128 GB" },
    { "instance": "db.r5.12xlarge", "cpu": "48 vCPU", "ram": "384 GB" },
    { "instance": "db.r5.24xlarge", "cpu": "96 vCPU", "ram": "768 GB" },

    // R6g instances: Memory optimized, based on AWS Graviton processors
    { "instance": "db.r6g.large", "cpu": "2 vCPU", "ram": "16 GB" },
    { "instance": "db.r6g.xlarge", "cpu": "4 vCPU", "ram": "32 GB" },
    { "instance": "db.r6g.2xlarge", "cpu": "8 vCPU", "ram": "64 GB" },
    { "instance": "db.r6g.4xlarge", "cpu": "16 vCPU", "ram": "128 GB" },
    { "instance": "db.r6g.12xlarge", "cpu": "48 vCPU", "ram": "384 GB" },
    { "instance": "db.r6g.16xlarge", "cpu": "64 vCPU", "ram": "512 GB" }
];

export const elasticacheTypes = [
    { "instance": "cache.t2.micro", "cpu": "1 vCPU", "ram": "0.5 GB" },
    { "instance": "cache.t2.small", "cpu": "1 vCPU", "ram": "1.55 GB" },
    { "instance": "cache.t2.medium", "cpu": "2 vCPU", "ram": "3.22 GB" },
    { "instance": "cache.t3.micro", "cpu": "2 vCPU", "ram": "0.5 GB" },
    { "instance": "cache.t3.small", "cpu": "2 vCPU", "ram": "1.37 GB" },
    { "instance": "cache.t3.medium", "cpu": "2 vCPU", "ram": "2.79 GB" },
    { "instance": "cache.m5.large", "cpu": "2 vCPU", "ram": "6.38 GB" },
    { "instance": "cache.m5.xlarge", "cpu": "4 vCPU", "ram": "13.07 GB" },
    { "instance": "cache.m5.2xlarge", "cpu": "8 vCPU", "ram": "26.14 GB" },
    { "instance": "cache.r5.large", "cpu": "2 vCPU", "ram": "13.07 GB" },
    { "instance": "cache.r5.xlarge", "cpu": "4 vCPU", "ram": "26.14 GB" },
    { "instance": "cache.r5.2xlarge", "cpu": "8 vCPU", "ram": "52.27 GB" },
    { "instance": "cache.t2.large", "cpu": "2 vCPU", "ram": "4.4 GB" },
    { "instance": "cache.t3.large", "cpu": "2 vCPU", "ram": "4.95 GB" },
    { "instance": "cache.m5.4xlarge", "cpu": "16 vCPU", "ram": "52.27 GB" },
    { "instance": "cache.m5.12xlarge", "cpu": "48 vCPU", "ram": "156.8 GB" },
    { "instance": "cache.r5.4xlarge", "cpu": "16 vCPU", "ram": "104.54 GB" },
    { "instance": "cache.r5.12xlarge", "cpu": "48 vCPU", "ram": "313.6 GB" },
    { "instance": "cache.t3.xlarge", "cpu": "4 vCPU", "ram": "5.88 GB" },
    { "instance": "cache.t3.2xlarge", "cpu": "8 vCPU", "ram": "11.77 GB" },
    { "instance": "cache.m5.24xlarge", "cpu": "96 vCPU", "ram": "313.6 GB" },
    { "instance": "cache.r5.24xlarge", "cpu": "96 vCPU", "ram": "627.2 GB" }
]

export const ec2InstanceTypes = [
    {
        "instance": "t2.nano",
        "cpu": "1 vCPU",
        "ram": "0.5 GB",
        "costPerMonth": 4.28
    },
    {
        "instance": "t2.micro",
        "cpu": "1 vCPU",
        "ram": "1 GB",
        "costPerMonth": 8.56
    },
    {
        "instance": "t2.small",
        "cpu": "1 vCPU",
        "ram": "2 GB",
        "costPerMonth": 17.12
    },
    {
        "instance": "t4g.micro",
        "cpu": "2 vCPU",
        "ram": "1 GB",
        "costPerMonth": 6.048
    },
    {
        "instance": "t4g.small",
        "cpu": "2 vCPU",
        "ram": "2 GB",
        "costPerMonth": 12.096
    },
    {
        "instance": "t2.medium",
        "cpu": "2 vCPU",
        "ram": "4 GB",
        "costPerMonth": 34.24
    },
    {
        "instance": "t2.large",
        "cpu": "2 vCPU",
        "ram": "8 GB",
        "costPerMonth": 68.48
    },
    {
        "instance": "t2.xlarge",
        "cpu": "4 vCPU",
        "ram": "16 GB",
        "costPerMonth": 136.96
    },
    {
        "instance": "t2.2xlarge",
        "cpu": "8 vCPU",
        "ram": "32 GB",
        "costPerMonth": 273.92
    },
    {
        "instance": "t3.micro",
        "cpu": "2 vCPU",
        "ram": "1 GB",
        "costPerMonth": 12.99
    },
    {
        "instance": "t3.small",
        "cpu": "2 vCPU",
        "ram": "2 GB",
        "costPerMonth": 25.98
    },
    {
        "instance": "t3.medium",
        "cpu": "2 vCPU",
        "ram": "4 GB",
        "costPerMonth": 51.96
    },
    {
        "instance": "t3a.medium",
        "cpu": "2 vCPU",
        "ram": "4 GB",
        "costPerMonth": 49.38
    },
    {
        "instance": "t3.large",
        "cpu": "2 vCPU",
        "ram": "8 GB",
        "costPerMonth": 103.92
    },
    {
        "instance": "m5.xlarge",
        "cpu": "4 vCPU",
        "ram": "16 GB",
        "costPerMonth": 130.00
    },
    {
        "instance": "m5a.large",
        "cpu": "2 vCPU",
        "ram": "8 GB",
        "costPerMonth": 61.2
    },
    {
        "instance": "c5.large",
        "cpu": "4 vCPU",
        "ram": "8 GB",
        "costPerMonth": 122.4
    },
    {
        "instance": "c5.xlarge",
        "cpu": "4 vCPU",
        "ram": "8 GB",
        "costPerMonth": 122.4
    },
    {
        "instance": "c5.2xlarge",
        "cpu": "8 vCPU",
        "ram": "16 GB",
        "costPerMonth": 244.8
    },
    {
        "instance": "c5.4xlarge",
        "cpu": "16 vCPU",
        "ram": "42 GB",
        "costPerMonth": 498.6
    },
    {
        "instance": "c6g.large",
        "cpu": "2 vCPU",
        "ram": "4 GB",
        "costPerMonth": 48.96
    },
    {
        "instance": "c6g.xlarge",
        "cpu": "4 vCPU",
        "ram": "8 GB",
        "costPerMonth": 97.92
    },
    {
        "instance": "c6g.2xlarge",
        "cpu": "8 vCPU",
        "ram": "16 GB",
        "costPerMonth": 195.84
    },
    {
        "instance": "r5.2xlarge",
        "cpu": "8 vCPU",
        "ram": "64 GB",
        "costPerMonth": 384.00
    },
    {
        "instance": "r5a.large",
        "cpu": "2 vCPU",
        "ram": "16 GB",
        "costPerMonth": 99.20
    },
    {
        "instance": "x1.32xlarge",
        "cpu": "128 vCPU",
        "ram": "1952 GB",
        "costPerMonth": 3984.00
    },
    {
        "instance": "p3.8xlarge",
        "cpu": "32 vCPU",
        "ram": "244 GB",
        "costPerMonth": 6656.00
    },
    {
        "instance": "g4dn.xlarge",
        "cpu": "4 vCPU",
        "ram": "16 GB",
        "costPerMonth": 262.00
    },
    {
        "instance": "d2.8xlarge",
        "cpu": "36 vCPU",
        "ram": "244 GB",
        "costPerMonth": 3000.00
    },
    {
        "instance": "h1.2xlarge",
        "cpu": "8 vCPU",
        "ram": "32 GB",
        "costPerMonth": 411.20
    },
    {
        "instance": "f1.2xlarge",
        "cpu": "8 vCPU",
        "ram": "122 GB",
        "costPerMonth": 1361.60
    },
    {
        "instance": "m6g.medium",
        "cpu": "1 vCPU",
        "ram": "4 GB",
        "costPerMonth": 38.76
    }
];