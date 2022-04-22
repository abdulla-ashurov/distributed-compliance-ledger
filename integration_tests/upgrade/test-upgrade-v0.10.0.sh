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

test_divider

# We should sleep that needs for the server to up and running
sleep 15


# PREPERATION
dcld_v0_9_0="./.localnet/node0/cosmovisor/genesis/bin/dcld"
dcld_v0_10_0="./.localnet/node0/cosmovisor/upgrades/v0.10.0/bin/dcld"

original_model_module_version=1

get_height current_height
echo "Current height is $current_height"

plan_height=$(expr $current_height + 20)
plan_name=v0.10.0

random_string vendor_account
vid=1
pid=2
productLabel="Device #1"
original_product_label="TestProductLabel"
sv=$RANDOM
svs=$RANDOM
certification_date="2020-01-01T00:00:01Z"
zigbee_certification_type="zigbee"
matter_certification_type="matter"

jack_address=$(echo $passphrase | dcld keys show jack -a)
alice_address=$(echo $passphrase | dcld keys show alice -a)
bob_address=$(echo $passphrase | dcld keys show bob -a)
anna_address=$(echo $passphrase | dcld keys show anna -a)

test_divider

###########################################################################################################################################
# SECTION AUTH
###########################################################################################################################################

# Body
echo "$vendor_account generates keys"
cmd="(echo $passphrase; echo $passphrase) | $dcld_v0_9_0 keys add $vendor_account"
result="$(bash -c "$cmd")"

test_divider

echo "Get key info for $vendor_account"
result=$(echo $passphrase | $dcld_v0_9_0 keys show $vendor_account)
check_response "$result" "\"name\": \"$vendor_account\""

test_divider

vendor_account_address=$(echo $passphrase | $dcld_v0_9_0 keys show $vendor_account -a)
vendor_account_pubkey=$(echo $passphrase | $dcld_v0_9_0 keys show $vendor_account -p)

test_divider

echo "Jack proposes account for $vendor_account"
result=$(echo $passphrase | $dcld_v0_9_0 tx auth propose-add-account --info="Jack is proposing this account" --address="$vendor_account_address" --pubkey="$vendor_account_pubkey" --roles="Vendor" --vid="$vid" --from jack --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Get a proposed account for $vendor_account and confirm that the approval contains Jack's address"
result=$($dcld_v0_9_0 query auth proposed-account --address=$vendor_account_address)
check_response "$result" "\"address\": \"$vendor_account_address\""
check_response_and_report "$result"  $jack_address "json"
check_response_and_report "$result"  '"info": "Jack is proposing this account"' "json"
response_does_not_contain "$result"  $alice_address "json"

test_divider

echo "Alice approves account $vendor_account"
result=$(echo $passphrase | $dcld_v0_9_0 tx auth approve-add-account --address="$vendor_account_address" --info="Alice is approving this account" --from alice --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Get $vendor_account account and confirm that alice and jack are set as approvers"
result=$($dcld_v0_9_0 query auth account --address=$vendor_account_address)
check_response "$result" "\"address\": \"$vendor_account_address\""
check_response_and_report "$result" $jack_address "json"
check_response_and_report "$result" '"info": "Jack is proposing this account"' "json"
check_response_and_report "$result" $alice_address "json"
check_response_and_report "$result" '"info": "Alice is approving this account"' "json"

test_divider


# ###########################################################################################################################################
# # SECTION MODEL
# ###########################################################################################################################################

# Body
echo "Add Model with VID: $vid PID: $pid"
result=$(echo "test1234" | $dcld_v0_9_0 tx model add-model --vid=$vid --pid=$pid --deviceTypeID=1 --productName=TestProduct --productLabel="$productLabel" --partNumber=1 --commissioningCustomFlow=0 --from=$vendor_account --yes)
check_response "$result" "\"code\": 0"
echo "$result"

test_divider

echo "Get Model with VID: $vid PID: $pid"
result=$($dcld_v0_9_0 query model get-model --vid=$vid --pid=$pid)
check_response "$result" "\"vid\": $vid"
check_response "$result" "\"pid\": $pid"
check_response "$result" "\"productLabel\": \"$productLabel\""
echo "$result"

test_divider

echo "Add Model Version with VID: $vid PID: $pid SV: $sv SoftwareVersionString:$svs"
result=$(echo '$passphrase' | $dcld_v0_9_0 tx model add-model-version --cdVersionNumber=1 --maxApplicableSoftwareVersion=10 --minApplicableSoftwareVersion=1 --vid=$vid --pid=$pid --softwareVersion=$sv --softwareVersionString=$svs --from=$vendor_account --yes)
echo $result
check_response "$result" "\"code\": 0"

test_divider


# ###########################################################################################################################################
# # SECTION VENDORINFO
# ###########################################################################################################################################

# Body
echo "Create VendorInfo Record for VID: $vid"
companyLegalName="XYZ IOT Devices Inc"
vendorName="XYZ Devices"
result=$(echo "test1234" | $dcld_v0_9_0 tx vendorinfo add-vendor --vid=$vid --companyLegalName="$companyLegalName" --vendorName="$vendorName" --from=$vendor_account --yes)
check_response "$result" "\"code\": 0"
echo "$result"

test_divider

echo "Verify if VendorInfo Record for VID: $vid is present or not"
result=$($dcld_v0_9_0 query vendorinfo vendor --vid=$vid)
check_response "$result" "\"vendorID\": $vid"
check_response "$result" "\"companyLegalName\": \"$companyLegalName\""
check_response "$result" "\"vendorName\": \"$vendorName\""
echo "$result"

test_divider


# # ###########################################################################################################################################
# # # SECTION COMPLIANCE
# # ###########################################################################################################################################

# Body
echo "Create other CertificationCenter account"
create_new_account zb_account "CertificationCenter"

test_divider

echo "Certify Model with VID: $vid PID: $pid  SV: ${sv} with zigbee certification"
result=$(echo "$passphrase" | $dcld_v0_9_0 tx compliance certify-model --vid=$vid --pid=$pid --softwareVersion=$sv --softwareVersionString=$svs --certificationType="$zigbee_certification_type" --certificationDate="$certification_date" --from $zb_account --yes)
echo "$result"
check_response "$result" "\"code\": 0"
echo $result

test_divider

echo "Certify Model with VID: $vid PID: $pid  SV: ${sv} with matter certification"
echo "$dcld_v0_9_0 tx compliance certify-model --vid=$vid --pid=$pid --softwareVersion=$sv --softwareVersionString=$svs --certificationType="$matter_certification_type" --certificationDate="$certification_date" --from $zb_account --yes"
result=$(echo "$passphrase" | $dcld_v0_9_0 tx compliance certify-model --vid=$vid --pid=$pid --softwareVersion=$sv --softwareVersionString=$svs --certificationType="$matter_certification_type" --certificationDate="$certification_date" --from $zb_account --yes)
echo "$result"
check_response "$result" "\"code\": 0"

test_divider

echo "Get Certified Model with VID: ${vid} PID: ${pid} SV: ${sv} for matter certification"
result=$($dcld_v0_9_0 query compliance certified-model --vid=$vid --pid=$pid --softwareVersion=$sv --certificationType=$matter_certification_type)
check_response "$result" "\"value\": true"
check_response "$result" "\"pid\": $pid"
check_response "$result" "\"vid\": $vid"
echo "$result"

test_divider

echo "Get Certified Model with VID: ${vid} PID: ${pid} SV: ${sv} for zigbee certification"
result=$($dcld_v0_9_0 query compliance certified-model --vid=$vid --pid=$pid --softwareVersion=$sv --certificationType=$zigbee_certification_type)
check_response "$result" "\"value\": true"
check_response "$result" "\"pid\": $pid"
check_response "$result" "\"vid\": $vid"
echo "$result"

test_divider


# ###########################################################################################################################################
# # SECTION PKI
# ###########################################################################################################################################

# Preparition
new_root_cert_subject="Tz1yb290LWNhLFNUPXNvbWUtc3RhdGUsQz1BVQ=="
old_root_cert_subject_key_id="5A:88:E:6C:36:53:D0:7F:B0:89:71:A3:F4:73:79:9:30:E6:2B:DB"
new_root_cert_subject_key_id="5A:88:0E:6C:36:53:D0:7F:B0:89:71:A3:F4:73:79:09:30:E6:2B:DB"
root_cert_serial_number="442314047376310867378175982234956458728610743315"
root_cert_subject_as_text="O=root-ca,ST=some-state,C=AU"

# Body
echo "Create regular account"
create_new_account user_account "CertificationCenter"

test_divider

echo "$vendor_account (Not Trustee) propose Root certificate"
root_path="integration_tests/constants/root_cert"
result=$(echo "$passphrase" | $dcld_v0_9_0 tx pki propose-add-x509-root-cert --certificate="$root_path" --from $vendor_account --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Request all proposed Root certificates - There should be no approvals"
result=$($dcld_v0_9_0 query pki all-proposed-x509-root-certs)
echo $result
check_response "$result" "\"subject\": \"$root_cert_subject_as_text\""
check_response "$result" "\"subjectKeyId\": \"$old_root_cert_subject_key_id\""

test_divider

echo "Jack (Trustee) approve Root certificate"
result=$(echo $passphrase | $dcld_v0_9_0 tx pki approve-add-x509-root-cert --subject="$root_cert_subject_as_text" --subject-key-id="$old_root_cert_subject_key_id" --from jack --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Request all proposed Root certificates - There should be no approvals"
result=$($dcld_v0_9_0 query pki all-proposed-x509-root-certs)
echo $result
check_response "$result" "\"subject\": \"$root_cert_subject_as_text\""
check_response "$result" "\"subjectKeyId\": \"$old_root_cert_subject_key_id\""

test_divider

echo "Alice (Second Trustee) approves Root certificate"
result=$(echo "$passphrase" | $dcld_v0_9_0 tx pki approve-add-x509-root-cert --subject="$root_cert_subject_as_text" --subject-key-id="$old_root_cert_subject_key_id" --from alice --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Certificate must be Approved and contain 2 approvals. Request Root certificate"
result=$($dcld_v0_9_0 query pki x509-cert --subject="$root_cert_subject_as_text" --subject-key-id="$old_root_cert_subject_key_id")
echo $result
check_response "$result" "\"subject\": \"$root_cert_subject_as_text\""
check_response "$result" "\"subjectKeyId\": \"$old_root_cert_subject_key_id\""
check_response "$result" "\"serialNumber\": \"$root_cert_serial_number\""
check_response "$result" "\"address\": \"$jack_address\""
check_response "$result" "\"address\": \"$alice_address\""

test_divider


# ###########################################################################################################################################
# # SECTION VALIDATOR
# ###########################################################################################################################################

# Preperation
LOCALNET_DIR=".localnet"
DCL_USER_HOME="/var/lib/dcl"
DCL_DIR="$DCL_USER_HOME/.dcl"

random_string account
node_name="node-demo"

# Body
echo "Generate keys for $account"
cmd="(echo $passphrase; echo $passphrase) | $dcld_v0_9_0 keys add $account"
result="$(bash -c "$cmd")"

test_divider

address=$(echo $passphrase | $dcld_v0_9_0 keys show $account -a)
pubkey=$(echo $passphrase | $dcld_v0_9_0 keys show $account -p)
echo "Create account for $account and Assign NodeAdmin role"

test_divider

result=$(echo $passphrase | $dcld_v0_9_0 tx auth propose-add-account --address="$address" --pubkey="$pubkey" --roles="NodeAdmin" --from jack --yes)
result=$(echo $passphrase | $dcld_v0_9_0 tx auth approve-add-account --address="$address" --from alice --yes)

test_divider

vaddress="cosmosvalcons1n4zqvut4hn50ayjljal9cwcq2dgx3r4aypd9q8"
vpubkey='{"@type":"/cosmos.crypto.ed25519.PubKey","key":"aYTJdrzEBBAEMlMNRelCRwf0rcpXZxvoQtZco7rlg+I="}'

test_divider

echo "Node Admin pubkey: $pubkey"
echo "Node Admin address: $address"

result=$(echo $passphrase | $dcld_v0_9_0 tx validator add-node --pubkey="$vpubkey" --moniker="$node_name" --from="$account" --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Check node \"$node_name\" is in the validator set"
result=$(dcld query validator all-nodes)
check_response "$result" "\"moniker\": \"$node_name\""
check_response "$result" "\"pubKey\":$vpubkey" raw
echo "$result"

test_divider


# ###########################################################################################################################################
# # SECTION UPGRADE
# ###########################################################################################################################################

# Body
echo "Propose upgrade $plan_name at height $plan_height"
result=$(echo $passphrase | $dcld_v0_9_0 tx dclupgrade propose-upgrade --name v0.10.0 --upgrade-height $plan_height --from jack --yes)
echo "$result"
check_response "$result" "\"code\": 0"

test_divider

echo "Approve upgrade $plan_name"
result=$(echo $passphrase | $dcld_v0_9_0 tx dclupgrade approve-upgrade --name v0.10.0 --from alice --yes)
echo "$result"
check_response "$result" "\"code\": 0"

test_divider

echo "Verify that upgrade $plan_name has been scheduled at height $plan_height"
result=$($dcld_v0_9_0 query upgrade plan)
echo "$result"
check_response "$result" "\"name\": \"$plan_name\""
check_response "$result" "\"height\": \"$plan_height\""

test_divider

echo "Verify that version of model module is currently $original_model_module_version"
result=$($dcld_v0_9_0 query upgrade module_versions model)
echo "$result"
check_response "$result" "\"version\": \"$original_model_module_version\""

test_divider

echo "Wait for block height to become greater than upgrade $plan_name plan height"
wait_for_height $(expr $plan_height + 1) 300 outage-safe

test_divider

echo "Verify that no upgrade has been scheduled anymore"
result=$($dcld_v0_9_0 query upgrade plan 2>&1) || true
check_response_and_report "$result" "no upgrade scheduled" raw

test_divider




###########################################################################################################################################
###########################################################################################################################################
# CHECK VERSION V0.10.0
###########################################################################################################################################
###########################################################################################################################################




###########################################################################################################################################
# SECTION UPGRADE
###########################################################################################################################################

# Body
echo "Verify that version of model module is currently $original_model_module_version"
result=$($dcld_v0_10_0 query upgrade module_versions model)
echo "$result"
check_response "$result" "\"version\": \"$original_model_module_version\""

test_divider

###########################################################################################################################################
# SECTION VALIDATOR
###########################################################################################################################################

# Body
result=$($dcld_v0_10_0 query validator node --address "$address")
validator_address=$(echo "$result" | jq -r '.owner')
echo "$result"

test_divider

result=$($dcld_v0_10_0 query validator node --address "$address")
check_response "$result" "\"moniker\": \"$node_name\""
check_response "$result" "\"pubKey\":$vpubkey" raw
check_response "$result" "\"owner\": \"$validator_address\""
echo "$result"

test_divider

result=$($dcld_v0_10_0 query validator node --address "$validator_address")
check_response "$result" "\"moniker\": \"$node_name\""
check_response "$result" "\"pubKey\":$vpubkey" raw
check_response "$result" "\"owner\": \"$validator_address\""
echo "$result"

test_divider

###########################################################################################################################################
# SECTION PKI
###########################################################################################################################################

# Body
result=$($dcld_v0_10_0 query pki x509-cert --subject="$root_cert_subject_as_text" --subject-key-id="$old_root_cert_subject_key_id")
echo $result | jq
check_response "$result" "\"subject\": \"$root_cert_subject_as_text\""
check_response "$result" "\"subjectKeyId\": \"$old_root_cert_subject_key_id\""
check_response "$result" "\"serialNumber\": \"$root_cert_serial_number\""
check_response "$result" "\"address\": \"$jack_address\""
check_response "$result" "\"address\": \"$alice_address\""

echo "Jack (Trustee) proposes to revoke Root certificate"
result=$(echo "$passphrase" | $dcld_v0_10_0 tx pki propose-revoke-x509-root-cert --subject="$root_cert_subject_as_text" --subject-key-id="$old_root_cert_subject_key_id" --from jack --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Request root certificate proposed to revoke and verify that it contains approval from $jack_address"
result=$($dcld_v0_10_0 query pki proposed-x509-root-cert-to-revoke --subject="$root_cert_subject_as_text" --subject-key-id="$old_root_cert_subject_key_id")
echo $result
check_response "$result" "\"$root_cert_subject_as_text\""
check_response "$result" "\"$old_root_cert_subject_key_id\""
check_response "$result" "\"address\": \"$jack_address\""

test_divider

echo "Alice (Second Trustee) approves to revoke Root certificate"
result=$(echo "$passphrase" | $dcld_v0_10_0 tx pki approve-revoke-x509-root-cert --subject="$root_cert_subject_as_text" --subject-key-id="$old_root_cert_subject_key_id" --from alice --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Request revoked Root certificate and also check for approvals from both Trustees"
result=$($dcld_v0_10_0 query pki revoked-x509-cert --subject="$root_cert_subject_as_text" --subject-key-id="$old_root_cert_subject_key_id")
echo $result | jq
check_response "$result" "\"subject\": \"$root_cert_subject_as_text\""
check_response "$result" "\"subjectKeyId\": \"$old_root_cert_subject_key_id\""
check_response "$result" "\"serialNumber\": \"$root_cert_serial_number\""
check_response "$result" "\"address\": \"$jack_address\""
check_response "$result" "\"address\": \"$alice_address\""

test_divider

echo "$vendor_account (Not Trustee) propose Root certificate"
root_path="integration_tests/constants/root_cert"
result=$(echo "$passphrase" | $dcld_v0_10_0 tx pki propose-add-x509-root-cert --certificate="$root_path" --from $vendor_account --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Request all proposed Root certificates - There should be no approvals"
result=$($dcld_v0_10_0 query pki all-proposed-x509-root-certs)
echo $result
check_response "$result" "\"subject\": \"$new_root_cert_subject\""
check_response "$result" "\"subjectKeyId\": \"$new_root_cert_subject_key_id\""

test_divider

echo "Jack (Trustee) approve Root certificate"
result=$(echo $passphrase | $dcld_v0_10_0 tx pki approve-add-x509-root-cert --subject="$new_root_cert_subject" --subject-key-id="$new_root_cert_subject_key_id" --from jack --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Request all proposed Root certificates - There should be no approvals"
result=$($dcld_v0_10_0 query pki all-proposed-x509-root-certs)
echo $result
check_response "$result" "\"subject\": \"$new_root_cert_subject\""
check_response "$result" "\"subjectKeyId\": \"$new_root_cert_subject_key_id\""

test_divider

echo "Alice (Second Trustee) approves Root certificate"
result=$(echo "$passphrase" | $dcld_v0_10_0 tx pki approve-add-x509-root-cert --subject="$new_root_cert_subject" --subject-key-id="$new_root_cert_subject_key_id" --from alice --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Certificate must be Approved and contain 2 approvals. Request Root certificate"
result=$($dcld_v0_10_0 query pki x509-cert --subject="$new_root_cert_subject" --subject-key-id="$new_root_cert_subject_key_id")
echo $result
check_response "$result" "\"subject\": \"$new_root_cert_subject\""
check_response "$result" "\"subjectKeyId\": \"$new_root_cert_subject_key_id\""
check_response "$result" "\"serialNumber\": \"$root_cert_serial_number\""
check_response "$result" "\"subjectAsText\": \"$root_cert_subject_as_text\""
check_response "$result" "\"address\": \"$jack_address\""
check_response "$result" "\"address\": \"$alice_address\""

test_divider


###########################################################################################################################################
# SECTION COMPLIANCE
###########################################################################################################################################

# Body
echo "Get Certified Model with VID: ${vid} PID: ${pid} SV: ${sv} for matter certification"
result=$($dcld_v0_10_0 query compliance certified-model --vid=$vid --pid=$pid --softwareVersion=$sv --certificationType=$matter_certification_type)
check_response "$result" "\"value\": true"
check_response "$result" "\"pid\": $pid"
check_response "$result" "\"vid\": $vid"
echo "$result"

test_divider

echo "Get Certified Model with VID: ${vid} PID: ${pid} SV: ${sv} for zigbee certification"
result=$($dcld_v0_10_0 query compliance certified-model --vid=$vid --pid=$pid --softwareVersion=$sv --certificationType=$zigbee_certification_type)
check_response "$result" "\"value\": true"
check_response "$result" "\"pid\": $pid"
check_response "$result" "\"vid\": $vid"
echo "$result"

test_divider


###########################################################################################################################################
# SECTION VENDORINFO
###########################################################################################################################################

# Body
echo "Verify if VendorInfo Record for VID: $vid is present or not"
result=$($dcld_v0_10_0 query vendorinfo vendor --vid=$vid)
check_response "$result" "\"vendorID\": $vid"
check_response "$result" "\"companyLegalName\": \"$companyLegalName\""
check_response "$result" "\"vendorName\": \"$vendorName\""
echo "$result"

test_divider


###########################################################################################################################################
# SECTION MODEL
###########################################################################################################################################

# Body
echo "Get Model with VID: $vid PID: $pid"
result=$($dcld_v0_10_0 query model get-model --vid=$vid --pid=$pid)
check_response "$result" "\"vid\": $vid"
check_response "$result" "\"pid\": $pid"
check_response "$result" "\"productLabel\": \"$productLabel\""

test_divider


###########################################################################################################################################
# SECTION AUTH
###########################################################################################################################################

# Body
echo "Get $vendor_account account and confirm that alice and jack are set as approvers"
echo "$vendor_account_address"
result=$($dcld_v0_10_0 query auth account --address=$vendor_account_address)
echo "$vendor_account_address"
check_response "$result" "\"address\": \"$vendor_account_address\""

test_divider

echo "Alice proposes to revoke account for $vendor_account"
result=$(echo $passphrase | $dcld_v0_10_0 tx auth propose-revoke-account --address="$vendor_account_address" --info="Alice proposes to revoke account" --from alice --yes)
check_response "$result" "\"code\": 0"

test_divider

echo "Get all accounts. $vendor_account account still in the list because not enought approvals to revoke received"
result=$($dcld_v0_10_0 query auth all-accounts)
check_response "$result" "\"address\": \"$vendor_account_address\""

test_divider

echo "Bob approves to revoke account for $vendor_account"
result=$(echo $passphrase | $dcld_v0_10_0 tx auth approve-revoke-account --address="$vendor_account_address" --from bob --yes)
check_response "$result" "\"code\": 0"

test_divider

trustee_voting="TrusteeVoting"

echo "Get all revoked accounts. $vendor_account account in the list"
result=$($dcld_v0_10_0 query auth all-revoked-accounts)
check_response "$result" "\"address\": \"$vendor_account_address\""
check_response "$result" "\"reason\": \"$trustee_voting\""

test_divider

echo "Get revoked account $vendor_account account"
result=$($dcld_v0_10_0 query auth revoked-account --address="$vendor_account_address")
check_response "$result" "\"address\": \"$vendor_account_address\""
check_response "$result" "\"reason\": \"$trustee_voting\""

test_divider

echo "PASSED"