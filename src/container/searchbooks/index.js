import React, { useState } from 'react';
import ContentLoader from "react-content-loader"
import SearchComponent from '../../components/search';
import SearchResults from '../../components/searchresult';
import { searchBooks } from '../../sources/search'
import ComponentStateHandler from '../../components/component-states-handler';

const SearchBooks = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false)

    const preLoader = () => {
        return <div style={{margin: '1em',
            padding: '0.5em',
            border: '1px solid #D7D7D7',
            boxShadow: '1px 1px 6px 0px #D7D7D7'}}>
            <ContentLoader
                speed={2}
                width={400}
                height={100}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="8" rx="3" ry="3" width="88" height="6" />
                <rect x="0" y="26" rx="3" ry="3" width="52" height="6" />
                <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
                
            </ContentLoader>
        </div>
    }

    const _getResults = async ({ id = ''}) => {
        setLoading(true);
        let response = await searchBooks({
            id
        })
        response && setSearchResults([
            ...searchResults,
            ...response['summaries']
        ])
        setLoading(false);
    }

    return (
        <>
            <SearchComponent search={_getResults} />
            <ComponentStateHandler isLoading={loading}
                preloader={preLoader()}>
                <SearchResults searchResults={searchResults} />
            </ComponentStateHandler>

        </>
    )
}

export default SearchBooks;