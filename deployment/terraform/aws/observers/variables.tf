variable "ssh_public_key_path" {
  description = "SSH public key file path"
  default     = "~/.ssh/id_rsa.pub"
}

variable "ssh_private_key_path" {
  description = "SSH private key file path"
  default     = "~/.ssh/id_rsa"
}

variable "ssh_username" {
  description = "SSH username"
  default     = "ubuntu"
}

variable "nodes_count" {
  description = "Number of Observer nodes"
  default     = 5
}

variable "region_index" {
  description = "Observer Region Index"
  default     = 0
}

variable "enable_tls" {
  description = "Enable TLS on LB listeners"
  default     = false
}

variable "root_domain_name" {
  description = "Root domain name"
  default     = ""
}

variable "peer_vpc" {
  description = "Peer VPC"
}
