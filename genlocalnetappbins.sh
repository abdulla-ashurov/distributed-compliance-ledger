set -euo pipefail

DOCKERFILE="${1:-Dockerfile-build}"
IMAGE_TAG="${2:-dcld-build}"
VERSION_DIR="${3:-genesis}"

LOCALNET_DIR=".localnet"

# docker build -f ${DOCKERFILE} -t ${IMAGE_TAG} .
# docker container create --name ${IMAGE_TAG}-inst ${IMAGE_TAG}

mkdir -p ./.localnet/release-v0.9.0
curl -L https://github.com/zigbee-alliance/distributed-compliance-ledger/releases/download/v0.9.0/dcld > ./.localnet/release-v0.9.0/dcld

for node_name in node0 node1 node2 node3 observer0 lightclient0; do
    if [[ -d "${LOCALNET_DIR}/${node_name}" ]]; then
        mkdir -p ${LOCALNET_DIR}/${node_name}/cosmovisor/${VERSION_DIR}/bin/
        # docker cp ${IMAGE_TAG}-inst:/go/bin/dcld ${LOCALNET_DIR}/${node_name}/cosmovisor/${VERSION_DIR}/bin/
        cp .localnet/release-v0.9.0/dcld ${LOCALNET_DIR}/${node_name}/cosmovisor/${VERSION_DIR}/bin/
        chmod a+x ${LOCALNET_DIR}/${node_name}/cosmovisor/${VERSION_DIR}/bin/dcld
    fi
done

# docker rm ${IMAGE_TAG}-inst
