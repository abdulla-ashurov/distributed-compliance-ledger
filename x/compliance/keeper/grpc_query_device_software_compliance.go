package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/zigbee-alliance/distributed-compliance-ledger/x/compliance/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) DeviceSoftwareCompliance(c context.Context, req *types.QueryGetDeviceSoftwareComplianceRequest) (*types.QueryGetDeviceSoftwareComplianceResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(c)

	val, found := k.GetDeviceSoftwareCompliance(
		ctx,
		req.CDCertificateID,
	)
	if !found {
		return nil, status.Error(codes.NotFound, "not found")
	}

	var complianceInfo []types.ComplianceInfo

	for _, complianceInformation := range val.ComplianceInfoIndex {
		info, found := k.GetComplianceInfo(ctx, complianceInformation.Vid, complianceInformation.Pid, complianceInformation.SoftwareVersion, complianceInformation.CertificationType)
		if found {
			complianceInfo = append(complianceInfo, info)
		}
	}

	return &types.QueryGetDeviceSoftwareComplianceResponse{ComplianceInfo: complianceInfo}, nil
}
