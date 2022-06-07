#!/bin/bash
# Copyright 2020 DSR Corporation
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -euo pipefail
source integration_tests/cli/common.sh


dcld_v0_9_0="./.localnet/node0/cosmovisor/genesis/bin/dcld"
dcld_v0_10_0="./.localnet/node0/cosmovisor/upgrades/v0.10.0/bin/dcld"


# Download release v0.10.0
mkdir -p ./.localnet/release-v0.10.0
echo "Downloading release v0.10.0"
curl -L https://github.com/zigbee-alliance/distributed-compliance-ledger/releases/download/v0.10.0/dcld > ./.localnet/release-v0.10.0/dcld
echo "Successfully has downloaded!"

test_divider

# Create directory for node for coping binary dcld version - v0.10.0.
mkdir -p ./.localnet/node0/cosmovisor/upgrades/v0.10.0/bin
mkdir -p ./.localnet/node1/cosmovisor/upgrades/v0.10.0/bin
mkdir -p ./.localnet/node2/cosmovisor/upgrades/v0.10.0/bin
mkdir -p ./.localnet/node3/cosmovisor/upgrades/v0.10.0/bin

cp ./.localnet/release-v0.10.0/dcld ./.localnet/node0/cosmovisor/upgrades/v0.10.0/bin/
cp ./.localnet/release-v0.10.0/dcld ./.localnet/node1/cosmovisor/upgrades/v0.10.0/bin/
cp ./.localnet/release-v0.10.0/dcld ./.localnet/node2/cosmovisor/upgrades/v0.10.0/bin/
cp ./.localnet/release-v0.10.0/dcld ./.localnet/node3/cosmovisor/upgrades/v0.10.0/bin/

# Add permission for node, that can use binary dcld v0.10.0.
docker exec "node0" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor/upgrades/v0.10.0/bin/dcld"
docker exec "node0" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor/upgrades/v0.10.0/bin/dcld"
docker exec "node1" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor/upgrades/v0.10.0/bin/dcld"
docker exec "node1" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor/upgrades/v0.10.0/bin/dcld"
docker exec "node2" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor/upgrades/v0.10.0/bin/dcld"
docker exec "node2" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor/upgrades/v0.10.0/bin/dcld"
docker exec "node3" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor/upgrades/v0.10.0/bin/dcld"
docker exec "node3" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor/upgrades/v0.10.0/bin/dcld"

# Add permission for node, that can use binary dcld v0.9.0.
docker exec "node0" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor/genesis/bin/dcld"
docker exec "node0" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor/genesis/bin/dcld"
docker exec "node1" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor/genesis/bin/dcld"
docker exec "node1" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor/genesis/bin/dcld"
docker exec "node2" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor/genesis/bin/dcld"
docker exec "node2" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor/genesis/bin/dcld"
docker exec "node3" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor/genesis/bin/dcld"
docker exec "node3" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor/genesis/bin/dcld"

# Run cosmovisor like seperate service from node
docker exec "node0" /bin/sh -c "systemctl enable cosmovisor"
docker exec "node0" /bin/sh -c "systemctl start cosmovisor"
docker exec "node1" /bin/sh -c "systemctl enable cosmovisor"
docker exec "node1" /bin/sh -c "systemctl start cosmovisor"
docker exec "node2" /bin/sh -c "systemctl enable cosmovisor"
docker exec "node2" /bin/sh -c "systemctl start cosmovisor"
docker exec "node3" /bin/sh -c "systemctl enable cosmovisor"
docker exec "node3" /bin/sh -c "systemctl start cosmovisor"


# We should sleep that needs for the server to up and running
sleep 15

test_divider

get_height current_height
echo "Current height is $current_height"

plan_height=$(expr $current_height + 5)
plan_name=v0.10.0

trustee_account_1="jack"
trustee_account_2="alice"

test_divider

echo "Propose upgrade $plan_name at height $plan_height"
result=$(echo $passphrase | $dcld_v0_9_0 tx dclupgrade propose-upgrade --name v0.10.0 --upgrade-height $plan_height --upgrade-info="{\"binaries\":{\"linux/amd64\":\"https://github.com/zigbee-alliance/distributed-compliance-ledger/releases/download/v0.10.0/dcld?checksum=sha256:ea0e16eed3cc30b5a7f17299aca01b5d827b9a04576662d957af02608bca0fb6\"}}" --from $trustee_account_1 --yes)
echo "$result"
check_response "$result" "\"code\": 0"

test_divider

echo "Approve upgrade $plan_name"
result=$(echo $passphrase | $dcld_v0_9_0 tx dclupgrade approve-upgrade --name v0.10.0 --from $trustee_account_2 --yes)
echo "$result"
check_response "$result" "\"code\": 0"

test_divider

echo "Verify that upgrade $plan_name has been scheduled at height $plan_height"
result=$($dcld_v0_9_0 query upgrade plan)
echo "$result"
check_response "$result" "\"name\": \"$plan_name\""
check_response "$result" "\"height\": \"$plan_height\""

test_divider


docker exec "node0" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor"
docker exec "node0" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor"
docker exec "node1" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor"
docker exec "node1" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor"
docker exec "node2" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor"
docker exec "node2" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor"
docker exec "node3" /bin/sh -c "chown 'dcl' /var/lib/dcl/.dcl/cosmovisor"
docker exec "node3" /bin/sh -c "chmod a+x /var/lib/dcl/.dcl/cosmovisor"


test_divider

echo "Wait for block height to become greater than upgrade $plan_name plan height"
wait_for_height $(expr $plan_height + 1) 300 outage-safe

test_divider

echo "Verify that no upgrade has been scheduled anymore"
result=$($dcld_v0_9_0 query upgrade plan 2>&1) || true
check_response_and_report "$result" "no upgrade scheduled" raw

test_divider

result=$($dcld_v0_10_0 status | jq)
echo "$result"

test_divider

echo "SUCCESS"