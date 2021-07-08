import React, { useContext } from 'react'
import { Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { DomainContext } from './Home'

export default function Domains() {
  const { domainResults } = useContext(DomainContext)

  return (
    <Container className="py-4">
      {domainResults.emails.length> 0 && <>
				<ListGroup>
					<Card className="text-center bg"  >
						<Card.Header >
							<h3 className="text-white" style={{textTransform: "uppercase"}}>{domainResults.organization}</h3>
							<Card.Text className="text">{domainResults.domain}</Card.Text>
						</Card.Header>
						{domainResults.domain && domainResults.emails.map((email, index) => (
							<ListGroupItem key={index}>
								<Card.Body>
									<Card.Title>{email.first_name || " "} {email.last_name || " "}</Card.Title>
									<Card.Text>{email.position}</Card.Text>
									<Card.Text className="text">{email.value}</Card.Text>
								</Card.Body>
							</ListGroupItem>
						))}
					</Card>
				</ListGroup>
        <a href="/" className="btn btn-primary my-2" tabIndex="-1" role="button" aria-disabled="true">
					Go back !!
				</a>
				</>
			}
    </Container>
  )
}
