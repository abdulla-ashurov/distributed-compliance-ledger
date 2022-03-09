## Running an Observer Node

This document describes in details how to run a observer node, and add it to the existing network.

The existing network can be either a custom one, or one of the persistent networks (such as a Test Net).
Configuration of all persistent networks can be found in [Persistent Chains](../../deployment/persistent_chains)
where each subfolder represents a `<chain-id>`.

If a new network needs to be initialized, please follow the [Running Genesis Node](running-genesis-node.md)
instructions first. After this more validator nodes can be added by following the instructions from this doc. 
 

### Hardware requirements

Minimal:
- 1GB RAM
- 25GB of disk space
- 1.4 GHz CPU

Recommended (for highload applications):
- 2GB RAM
- 100GB SSD
- x64 2.0 GHz 2v CPU

### Operating System

Current delivery is compiled and tested under `Ubuntu 18.04.3 LTS and MacOS` so we recommend using this distribution for now. In future, it will be possible to compile the application for a wide range of operating systems thanks to Go language.

## Components

The latest release can be found at [DCL Releases](https://github.com/zigbee-alliance/distributed-compliance-ledger/releases).

The following components will be needed:

* dcld (part of the release): The binary used for running a node and CLI.
* The service configuration file `dcld.service` 
(either part of the release or [deployment](../../deployment) folder).    
* Genesis transactions file: `genesis.json`
* The list of alive peers: `persistent_peers.txt`. It has the following format: `<node id>@<node ip>,<node2 id>@<node2 ip>,...`.

If you want to join an existing persistent network (such as Test Net), then look at the [Persistent Chains](../../deployment/persistent_chains)
folder for a list of available networks. Each subfolder there represents a `<chain-id>` 
and contains the genesis and persistent_peers files. 

### Deployment steps

1. Put `dcld` binary to `/usr/bin/` and configure permissions.


2. Configure CLI:
    * `dcld config chain-id testnet`
    * `dcld config output json` - Output format (text/json).

3. Initialize the observer node and create the necessary config files:
    * Init Node: `dcld init <node name> --chain-id testnet`.
    * Put `genesis.json` into dcld's config directory (usually `$HOME/.dcl/config/`).
        * Use `deployment/persistent_chains/testnet/genesis.json` if you want to connect to the persistent Test Net
    * Open `$HOME/.dcl/config/config.toml` file in your favorite text editor:
        * Tell node how to connect to the network:
            * Set the value for the `persistent_peers` field as the content of `persistent_peers.txt` file.
            * Use `deployment/persistent_chains/testnet/persistent_peers.txt` if you want to connect to the persistent Test Net.
        * Make your node public (this step is only needed for Ubuntu):
            * Open `$HOME/.dcl/config/config.toml`
            * Find the line under `# TCP or UNIX socket address for the RPC server to listen on`
            * Change it to: `laddr = "tcp://0.0.0.0:26657"`
        * Optionally change other setting.
    * Open `26656` (p2p) and `26657` (RPC) ports (Only needed for Ubuntu). 
        * `sudo ufw allow 26656/tcp`
        * `sudo ufw allow 26657/tcp`
    * Edit `dcld.service` (Only needed for Ubuntu).
        * Replace `ubuntu` with a username you want to start service on behalf
    * Copy service configuration. (Only needed for Ubuntu).
        * `cp dcld.service /etc/systemd/system/`


4. Start the local observer node
   * Enable the service: `sudo systemctl enable dcld`
   * Start node: `sudo systemctl start dcld`
   * For testing purpose the node can be started in CLI mode: `dcld start` (instead of two previous `systemctl` commands).
   Service mode is recommended for demo and production environment.

   You should see it trying to get all the blocks from the testnet. (p.s. It can take upto 12+ hrs for all the transactions to be downloaded depending on network speed)


5. Check the observer node is running and getting all the transactions:

    * Get the node status: `dcld status --node tcp://localhost:26657`.
    * Make sure that `result.sync_info.latest_block_height` is increasing over the time (once in about 5 sec). When you see the `catching_up` as `true` that signifies that the node is still downloading all the transactions. Once it has fully synced this will value will turn to `false`
       Expected output format: 
        ```json
                    {
              "node_info": {
                "protocol_version": {
                  "p2p": "7",
                  "block": "10",
                  "app": "0"
                },
                "id": "15f99a46e3e5b109c02a86586484aa14e28d25b0",
                "listen_addr": "tcp://0.0.0.0:26656",
                "network": "testnet",
                "version": "0.32.8",
                "channels": "4020212223303800",
                "moniker": "myon",
                "other": {
                  "tx_index": "on",
                  "rpc_address": "tcp://127.0.0.1:26657"
                }
              },
              "sync_info": {
                "latest_block_hash": "D24C7DE69BB4E38068B5B94F30AA5EAFC4BE8EDE3064BE34FE34DBD8634DB8B5",
                "latest_app_hash": "F6FB39F80629F87E189F64E79B0574D87CEDFAEF80FD34AF4D3250604B471F90",
                "latest_block_height": "6390",
                "latest_block_time": "2020-10-19T19:42:12.923219099Z",
                "catching_up": true
              },
              "validator_info": {
                "address": "74EDDFE44B1AFD520C8799FFE0E1C2FCC165F9EE",
                "pub_key": {
                  "type": "tendermint/PubKeyEd25519",
                  "value": "8Sp4VGVjQTaMvz5CTre/kVf2wEOUHg9L4AW6sPevlss="
                },
                "voting_power": "0"
              }
            }
        ```
    
6. Congrats! You are now running an observer node.
