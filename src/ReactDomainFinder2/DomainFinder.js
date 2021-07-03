import React,{useState, useEffect, useContext} from 'react'
import { Container, Form, Button, Row, Col, Jumbotron, Spinner, Navbar, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import { Redirect } from 'react-router-dom'
import { DomainContext } from './Home'

export default function DomainFinder() {

	const { setDomainResults } = useContext(DomainContext)
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded]= useState(false)
	const [domain, setDomain]= useState("")
	const [pdomain, setPDomain]= useState()
	const [redirect, setRedirect] = useState(false)
	const apikey = ""
	function handleClick(e){
		e.preventDefault()
		setIsLoaded(false)
		setPDomain(domain)
	}

	useEffect(()=> {
		fetch(`https://api.hunter.io/v2/domain-search?domain=${pdomain}&api_key=${apikey}`, {mode: 'no-cors'})
		.then(res => res.json())
		.then(response => {
			setDomainResults(response.data)
			if(response.data.domain){
				setRedirect(true)
			}
			setIsLoaded(true)
		}).catch(error => {
			setIsLoaded(true)
			setError(error)
		})
	},[pdomain, setDomainResults])

	if(error){
		return(   
			<div>Error</div>
		)
	}else if(!isLoaded){
		return (
			<div style={{display: "grid", placeItems: "center"}}>
				<Spinner animation="grow" />
			</div>
		)
	}else{
		return(
			<>
			<Container className="my-4">
				{redirect && <Redirect to='/domains'/>}
				<Jumbotron>
					<h1 style={{textAlign: "center"}}>Domain Search</h1>
					<div className="mt-5">
						<em>
							The Domain Search requires a domain name and returns a set of data about the organisation, the email address found and additional information about the people owning those email addresses.
						</em>
					</div>
				</Jumbotron>
				<Form>
					<Form.Group>
						<Row className="d-flex justify-content-center">
							<Col>
								<Form.Control 
									type="text" 
									onChange={e =>
									setDomain(e.target.value)
									} 
									value={domain}
									placeholder="Enter domain..."
									required
								/>
							</Col>
							<Col>
								<Button type="submit" variant="outline-secondary" onClick={handleClick}>
									Find...
								</Button>
							</Col>
						</Row>
					</Form.Group>
				</Form> 
			</Container>
			<Container>
			<Navbar bg="transparent" fixed="bottom" variant="light">
				<Navbar.Brand href="#">
					<strong>Niku419</strong>
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="https://github.com/niku419"><FontAwesomeIcon icon={faGithub} /></Nav.Link>
					<Nav.Link href="https://linkedin.com/niku_419"><FontAwesomeIcon icon={faLinkedinIn} /></Nav.Link>
					<Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon icon={faInstagram} /></Nav.Link>
					<Nav.Link href="#"><FontAwesomeIcon icon={faFacebookF} /></Nav.Link>
				</Nav>
				<Form inline>
					{/* <Nav className="mr-auto"> 
						<Nav.Link>made for Hiku<FontAwesomeIcon color="#8d0101" icon={faHeart} /></Nav.Link>
					</Nav> */}
				</Form>
		</Navbar>
		</Container>
		</>
		)
	}
}
