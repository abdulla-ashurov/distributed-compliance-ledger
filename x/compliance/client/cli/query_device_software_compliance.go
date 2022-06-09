package cli

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/spf13/cobra"
	"github.com/zigbee-alliance/distributed-compliance-ledger/utils/cli"
	"github.com/zigbee-alliance/distributed-compliance-ledger/x/compliance/types"
)

func CmdShowDeviceSoftwareCompliance() *cobra.Command {
	var (
		CDCertificateID string
	)

	cmd := &cobra.Command{
		Use:   "device-software-compliance",
		Short: "Shows a device software compliance",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx := client.GetClientContextFromCmd(cmd)
			var res types.DeviceSoftwareCompliance

			return cli.QueryWithProof(
				clientCtx,
				types.StoreKey,
				types.DeviceSoftwareComplianceKeyPrefix,
				types.DeviceSoftwareComplianceKey(CDCertificateID),
				&res,
			)
		},
	}

	cmd.Flags().StringVarP(&CDCertificateID, FlagCDCertificateID, FlagCDCertificateIDShortcut, "", TextCDCertificateID)

	_ = cmd.MarkFlagRequired(FlagCDCertificateID)

	return cmd
}
