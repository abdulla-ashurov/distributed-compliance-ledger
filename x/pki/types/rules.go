package types

import dclauthtypes "github.com/zigbee-alliance/distributed-compliance-ledger/x/dclauth/types"

// TODO: 1. Move it to separate module  	2. Make it configurable		3. Save into store.
var (
	RootCertificateApprovalsPercent float64 = 0.66
	RootCertificateApprovalRole             = dclauthtypes.Trustee
)
