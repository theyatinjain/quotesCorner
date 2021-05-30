import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm'
import usehttp from '../components/hooks/use-http';
import { addQuote } from '../components/lib/api';

function NewQuote() {
    const { sendRequest, status } = usehttp(addQuote);
    const history = useHistory();
    useEffect(() => {
        if (status === 'completed') history.push('/quotes');
    }, [status, history]);
    const addQuoteHandler = quoteData => sendRequest(quoteData)
    return (
        <section>
            <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
        </section>
    )
}

export default NewQuote
