import { Button, Container } from "react-bootstrap"

const Pages = ({hasNext,page}) => 
{
    const nextPage =()=>
    {
        
        localStorage.setItem('page',+page+1)
        location.reload()
    }

    const prevPage =()=>
    {
        localStorage.setItem('page',+page-1)
        location.reload()
    }

    return (
        <Container className="pages">
            <div className="d-flex justify-content-center mt-5 mb-0">
            {
                page != 1
                ?
                <Button className="btn-dark p-2 m-2" onClick={prevPage}>
                    ← prev results
                </Button>
                :null
            }
            {
                hasNext 
                ?
                <Button className="btn-dark p-2 m-2" onClick={nextPage}>
                    more results →
                </Button>
                :null
            }
            </div>
        </Container>
    )
}

export default Pages