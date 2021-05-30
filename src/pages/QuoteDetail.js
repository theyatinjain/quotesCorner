import React, { Fragment, useEffect } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import useHttp from '../components/hooks/use-http';
import { getSingleQuote } from '../components/lib/api';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';

function QuoteDetail() {
    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);
    const match = useRouteMatch();
    const params = useParams();
    const { quoteId } = params;
    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest, quoteId]);
    if(status === 'pending') return <div className="centered"><LoadingSpinner /></div>
    if(error) return <p className="centered focused" >{error}</p>
    if (!loadedQuote.text) return <p>No Quote Found! :(</p>
    return (
        <Fragment>
            <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    )
}

export default QuoteDetail
