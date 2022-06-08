package cli

import (
	"context"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"github.com/zigbee-alliance/distributed-compliance-ledger/x/compliance/types"
)

func CmdShowDeviceSoftwareCompliance() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "show-device-software-compliance [cd-certificate-id]",
		Short: "shows a DeviceSoftwareCompliance",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx := client.GetClientContextFromCmd(cmd)

			queryClient := types.NewQueryClient(clientCtx)

			argCDCertificateID := args[0]

			params := &types.QueryGetDeviceSoftwareComplianceRequest{
				CDCertificateID: argCDCertificateID,
			}

			res, err := queryClient.DeviceSoftwareCompliance(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
