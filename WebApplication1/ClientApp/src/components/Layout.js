import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div id='height2'>
                <NavMenu />
                <Container-fluid>
                    {this.props.children}
                </Container-fluid>
            </div>
        );
    }
}
