import React from "react";

class StellarPriceTicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: null,
            error: null
        };
    }

    componentDidMount() {
        this.fetchPrice();
        this.timerID = setInterval(
            () => this.fetchPrice(),
            10000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    fetchPrice() {
        console.log('Fetching price...');
        fetch('https://www.bitstamp.net/api/v2/ticker/xlmeur/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                this.setState({ price: data.last }, () => {
                    console.log('Price updated:', this.state.price);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ error: 'Failed to fetch price' });
            });
    }

    render() {
        const { price, error } = this.state;
        console.log('Rendering with price:', price, 'and error:', error);
        return (
            <div>
                <h2>Stellar price is</h2>
                {error ? <p>{error}</p> : <p>{price ? `${price} €` : 'Loading...'}</p>}
            </div>
        );
    }
}

ReactDOM.render(<StellarPriceTicker />, document.getElementById('root'));