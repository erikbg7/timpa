<header class="legal-information-header">

# Security

<p>Effective Date: March 1, 2024</p>

</header>

Security is always the number one priority at Xata and we care deeply about the privacy of your data. We follow the industry best practices with the highest strictness. These practices include:

- Data encryption at rest for all our data stores
- Data encryption in transit for all our network communication, internal or external
- Controls and policies for whom in the company can access production systems directly
- Credentials have minimal scope and are rotated periodically
- SSO with MFA is required for all critical services
- Software dependencies are automatically scanned for vulnerabilities
- Software dependencies are normally upgraded with weekly cadence
- All third-party risks are regularly assessed
- Clear separation between the control plane and the data plane
- No PII information is logged in our observability system longer than 2 weeks
- Security news and threat intelligence feeds are followed
- The Xata service runs on AWS and Cloudflare, which ensure the physical security of our servers. AWS is PCI-DSS and HIPAA/HITECH, FedRAMP, FIPS 140-2, and NIST 800-171 compliant. Cloudflare has SOC 2 Type II, FedRAMP Moderate, PCI DSS 3.2.1 and more certifications.

Xata is GDPR compliant and will be seeking more compliance certifications in the future. If you require a particular certification in order to use Xata, please contact us.

## Responsible Vulnerability Disclosures

We greatly appreciate the security professionals community for responsibly disclosing vulnerabilities and helping us keep our customers’ data safe.

If you discover a vulnerability, please email security@xata.io with your findings. For new vulnerabilities that we assess as at least medium severity, we will reward you with a bounty at our discretion.

When searching for vulnerabilities, please:

- Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service. Only interact with accounts you own or with explicit permission of the account holder.
- Keep all information related to the discovered vulnerability confidential until we publicly disclose it or provide explicit permission for disclosure.
- Do not perform any form of Denial of Service (DoS) or Distributed Denial of Service (DDoS) attacks.
- Do not use automated scanners without explicit permission from us.
- Provide sufficient information to reproduce the vulnerability, including a proof of concept or detailed steps.

We promise:

- We will reply to your message in at most 3 business days.
- We will keep you informed with the progress to mitigate and resolve the vulnerability.
- We will handle your report with strict confidentiality.
- If we publish the public report, we will give you credit for finding the vulnerability.

We consider the following out of scope and not eligible for rewards:

- Bugs with no security implications
- Email spoofing
- Social engineering and phishing
- DoS or DDoS attacks
- Any vulnerability against the feedback.xata.io sub-domain
