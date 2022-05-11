# Pool Upgrade How To

Below there are steps which need to be done to upgrade a pool to a new DCL
application version:

1. **[Dev Team] New Release and Upgrade Name**: A new release of
   [distributed-compliance-ledger](https://github.com/zigbee-alliance/distributed-compliance-ledger)
   project is issued. The code of the new released application version must be
   augmented by a new upgrade handler which will handle an upgrade to this new
   version. This upgrade handler must have a unique name which will serve as the
   name of the upgrade to this new version.

2. **[Trustees] Upgrade Height**: A ledger height not reached yet at which all
   the nodes in the pool must be upgraded to the new application version is
   chosen.

3. **[A Trustee] ProposeUpgrade**: One of trustees proposes the upgrade using
   the following steps:

   1. Calculates SHA-256 or SHA-512 checksums of the new application version
      binaries (for the supported platforms) taken from the project release.
      This can be done using `sha256sum` or `sha512sum` tool.

      For example:

      ```bash
      sha256sum ./dcld
      ```

   2. Sends [`ProposeUpgrade`](./transactions.md#propose_upgrade) transaction
      with the name of the new upgrade handler, the chosen ledger height and the
      info containing URLs of the new application version binaries for supported
      platforms with the calculated checksums.

      For example:

      ```bash
      dcld tx dclupgrade propose-upgrade --name=vX.X.X --upgrade-height=<int64> --upgrade-info="{\"binaries\":{\"linux/amd64\":\"https://github.com/zigbee-alliance/distributed-compliance-ledger/releases/download/vX.X.X/dcld?checksum=sha256:50708d4f7e00da347d4e678bf26780cd424232461c4bb414f72391c75e39545a\"}}" --from=alice
      ```

4. **[Trustees] ApproveUpgrade**: Other trustees approve the proposed upgrade
   until it turns into the approved state and is scheduled (this happens when
   the count of approvals including the proposal reaches 2/3 of the total count
   of trustees). Each of them uses the following steps to accomplish this:

   1. Re-calculates checksums of the new application version binaries (for the
      supported platforms) taken from the project release. This can be done
      using `sha256sum` / `sha512sum` tool.

      For example:

      ```bash
      sha256sum ./dcld
      ```

   2. Ensures that the re-calculated values are equal to the checksums specified
      in the proposed upgrade plan `Info` field.

      Example how to view the proposed upgrade plan:

      ```bash
      dcld query dclupgrade proposed-upgrade --name=vX.X.X
      ```

   3. Verifies that the application binaries URLs provided in the proposed
      upgrade plan `Info` field are valid and that the files referenced by them
      match the provided checksums.

   4. Verifies that `Height` field of the proposed upgrade plan has the proper
      value.

   5. Sends [`ApproveUpgrade`](./transactions.md#approve_upgrade) transaction
      with the name of the proposed upgrade.

      For example:

      ```bash
      dcld tx dclupgrade approve-upgrade --name=vX.X.X --from=bob
      ```

5. **[Anyone] Ensure That Upgrade Has Been Scheduled**: It makes sense to ensure
   that the upgrade has been approved and scheduled.

   Example how to view the approved upgrade plan:

   ```bash
   dcld query dclupgrade approved-upgrade --name=vX.X.X
   ```

   Command to view the current scheduled upgrade plan:

   ```bash
   dcld query upgrade plan
   ```

6. **[All Node Admins] Download New Binary**: Before the ledger reaches the
   height specified in the upgrade plan, each node admin does the following
   steps *(these must be done for all the nodes: validators, observers, seed
   nodes, sentry nodes)*:

    1. Switches current user to the user on behalf of whom `cosmovisor` service
       is running:

       ```bash
       su - <USERNAME>
       ```

       where `<USERNAME>` is the corresponding username

       The command will ask for the user's password. Enter it.

    2. Downloads the application binary from the URL specified in the upgrade
       plan `Info` field and corresponding to the node platform.

       Command to view the current scheduled upgrade plan:

       ```bash
       dcld query upgrade plan
       ```

    3. Downloads and verifies that the downloaded application binary matches
       the checksum specified in the URL. This can be done with a single-line
       command:

       For example:

       ```bash
       curl -fsSL https://raw.githubusercontent.com/zigbee-alliance/distributed-compliance-ledger/master/deployment/scripts/install.sh | SHA256SUM=ea0e16eed3cc30b5a7f17299aca01b5d827b9a04576662d957af02608bca0fb6 bash
       ```

       | Variable   | Default                                     | Description                                  |
       |:-----------|:--------------------------------------------|----------------------------------------------|
       | DEBUG      | false                                       | Enables verbose mode during the execution    |
       | DCL_HOME   | $HOME/.dcl                                  | DCL home folder                              |
       | VERSION    |                                             | DCL binary version to be upgraded            |
       | DEST       | $DCL_HOME/cosmovisor/upgrades/v$VERSION/bin | Destination path for DCL binary              |
       | SHA256SUM  |                                             | SHA256 sum value for DCL binary verification |

7. **Upgrade Is Applied**: The upgrade is applied on all the nodes in the pool
   when the ledger reaches the height specified in the upgrade plan.

   Command to view the current pool status:

   ```bash
   dcld status
   ```

   The current ledger height is reported in `SyncInfo` -> `latest_block_height`
   field.

   Example of command to check whether the upgrade was applied:

   ```bash
   dcld query upgrade applied vX.X.X
   ```

   If the upgrade with the passed name was applied, this command output will
   contain information about it.
