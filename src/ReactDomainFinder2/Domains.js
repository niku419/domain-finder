import React, { useContext } from 'react'
import { Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { DomainContext } from './Home'

export default function Domains() {
  const { domainResults } = useContext(DomainContext)

  return (
    <Container>
      {domainResults.emails.length> 0 && <>
				<ListGroup>
					<Card className="text-center" bg="dark" >
						<Card.Header >
							<h3 className="text-white" style={{textTransform: "uppercase"}}>{domainResults.organization}</h3>
							<small className="text-muted">
								<cite title="Source Title">{domainResults.domain}</cite>
							</small>
						</Card.Header>
						{domainResults.domain && domainResults.emails.map((email, index) => (
							<ListGroupItem key={index}>
								<Card.Body>
									<Card.Title>{email.first_name || " "} {email.last_name || " "}</Card.Title>
									<Card.Text>{email.position}</Card.Text>
									<footer className="blockquote-footer">
										<small className="text-muted">
											<cite title="Source Title">{email.value}</cite>
										</small>
									</footer>
								</Card.Body>
							</ListGroupItem>
						))}
					</Card>
				</ListGroup>
        <a href="/" className="btn btn-secondary pt-2" tabIndex="-1" role="button" aria-disabled="true">
					Go back !!
				</a>
				</>
			}
    </Container>
  )
}
