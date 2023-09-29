import Context from "./Context"

const Provider = ({children}) => 
{
    const baseURL = 'https://api.consumet.org/anime/gogoanime'
    return (
        <Context.Provider
            value={
                {
                    baseURL,
                }}
        >
            {children}
        </Context.Provider>
    )
}

export default Provider