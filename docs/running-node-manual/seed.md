# Running a Seed Node manually

## Prerequisites

Make sure you have all [prerequisites](./prerequisites.md) set up

## Deployment steps

### Steps are the same as in [full-node.md](./full-node.md)

except:

- Set `<node-type>` to `"seed"` when using [run_dcl_node](./full-node.md#step-8-can-be-automated-using-rundclnode-script)
- Configure node specific parameters before running the node:

    [`config.toml`]

    ```toml
    [p2p]
    pex = true
    seed_mode = true
    persistent_peers = # `Public Sentry` nodes with public IP
    ```
