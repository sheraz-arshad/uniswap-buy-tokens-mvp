import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';

export class SellToken extends Component {
    render() {
        return (
            <Jumbotron style={{
                padding: "40px",
                margin: "10% auto",
                width: "400px",
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
            }}>
                SellToken
            </Jumbotron>
        );
    }
}
