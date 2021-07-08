import React,{useState, useEffect, useContext} from 'react'
import { Container, Form, Button, Jumbotron, Spinner, Navbar, Nav, Badge } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import { Redirect } from 'react-router-dom'
import { DomainContext } from './Home'

export default function DomainFinder() {

	const { setDomainResults } = useContext(DomainContext)
	const [isLoaded, setIsLoaded]= useState(false)
	const [domain, setDomain]= useState("")
	const [pdomain, setPDomain]= useState()
	const [redirect, setRedirect] = useState(false)

	function handleClick(e){
		e.preventDefault()
		setIsLoaded(false)
		setPDomain(domain)
	}

	useEffect(()=> {
		fetch(`https://api.hunter.io/v2/domain-search?domain=${pdomain}&api_key=2104bd16df84f03b09a2ff3135c37d2ed810e05a`)
		.then(res => res.json())
		.then(response => {
			setDomainResults(response.data)
			if(response.data.domain){
				setRedirect(true)
			}
			setIsLoaded(true)
		}).catch(error => {
			setIsLoaded(true)
		})
	},[pdomain, setDomainResults])

	if(!isLoaded){
		return (
			<div style={{display: "grid", placeItems: "center"}}>
				<Spinner animation="grow" />
			</div>
		)
	}else{
		return(
			<div>
				<Container className="py-4">
					{redirect && <Redirect to='/domains'/>}
					<Jumbotron>
						<h1 style={{textAlign: "center"}} className="primary"><Badge variant="primary">Domain Search</Badge></h1>
						<div className="mt-3">
							<em>
								The Domain Search requires a domain name and returns a set of data about the organisation, the email address found and additional information about the people owning those email addresses.
							</em>
						</div>
					</Jumbotron>
					<Form>
						<Form.Group>
							<Form.Control 
								type="text" 
								placeholder="Enter domain..."
								value={domain}
								onChange={e =>
									setDomain(e.target.value)
								} 
								required={true}
							/>
						</Form.Group>
						<div className="d-flex justify-content-center"><Button type="submit" variant="primary" onClick={handleClick}>Find them...</Button></div>					
					</Form> 
				</Container>
				<Container >
					<Navbar className="not-transparent" fixed="bottom" variant="light">
						<Navbar.Brand href="#">
							<strong>Niku419</strong>
						</Navbar.Brand>
						<Nav className="mr-auto">
							<Nav.Link href="https://github.com/niku419"><FontAwesomeIcon icon={faGithub} /></Nav.Link>
							<Nav.Link href="https://linkedin.com/niku_419"><FontAwesomeIcon icon={faLinkedinIn} /></Nav.Link>
							<Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon icon={faInstagram} /></Nav.Link>
							<Nav.Link href="https://www.facebook.com/profile.php?id=100069976086066"><FontAwesomeIcon icon={faFacebookF} /></Nav.Link>
						</Nav>
						{/* <Form inline>
							<Nav className="mr-auto"> 
								<Nav.Link>made for Hiku<FontAwesomeIcon color="#8d0101" icon={faHeart} /></Nav.Link>
							</Nav>
						</Form> */}
					</Navbar>
				</Container>
			</div>
		)
	}
}