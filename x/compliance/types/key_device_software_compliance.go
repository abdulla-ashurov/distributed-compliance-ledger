package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// DeviceSoftwareComplianceKeyPrefix is the prefix to retrieve all DeviceSoftwareCompliance
	DeviceSoftwareComplianceKeyPrefix = "DeviceSoftwareCompliance/value/"
)

// DeviceSoftwareComplianceKey returns the store key to retrieve a DeviceSoftwareCompliance from the index fields
func DeviceSoftwareComplianceKey(
	cDCertificateID string,
) []byte {
	var key []byte

	cDCertificateIDBytes := []byte(cDCertificateID)
	key = append(key, cDCertificateIDBytes...)
	key = append(key, []byte("/")...)

	return key
}
