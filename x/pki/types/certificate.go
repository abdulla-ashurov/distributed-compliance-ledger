package types

func NewRootCertificate(pemCert string, subject string, subjectKeyId string,
	serialNumber string, owner string, approvals []*Grant) Certificate {
	return Certificate{
		PemCert:      pemCert,
		Subject:      subject,
		SubjectKeyId: subjectKeyId,
		SerialNumber: serialNumber,
		IsRoot:       true,
		Owner:        owner,
		Approvals:    approvals,
	}
}

func NewNonRootCertificate(pemCert string, subject string, subjectKeyId string, serialNumber string,
	issuer string, authorityKeyId string,
	rootSubject string, rootSubjectKeyId string,
	owner string) Certificate {
	return Certificate{
		PemCert:          pemCert,
		Subject:          subject,
		SubjectKeyId:     subjectKeyId,
		SerialNumber:     serialNumber,
		Issuer:           issuer,
		AuthorityKeyId:   authorityKeyId,
		RootSubject:      rootSubject,
		RootSubjectKeyId: rootSubjectKeyId,
		IsRoot:           false,
		Owner:            owner,
	}
}

func (cert ProposedCertificate) HasApprovalFrom(address string) bool {
	for _, approval := range cert.Approvals {
		if approval.Address == address {
			return true
		}
	}
	return false
}

func (d ProposedCertificateRevocation) HasApprovalFrom(address string) bool {
	for _, approvals := range d.Approvals {
		if approvals.Address == address {
			return true
		}
	}
	return false
}

func (cert Certificate) HasApprovalFrom(address string) bool {
	for _, approval := range cert.Approvals {
		if approval.Address == address {
			return true
		}
	}
	return false
}
