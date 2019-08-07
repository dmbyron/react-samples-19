import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

class NewsFilter extends Component {
    render() {
        return (
            <Form>
                <Row>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Keywords</Form.Label>
                        <Form.Control placeholder="Keyword" onChange={this.props.keywordOnChange}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>News Type</Form.Label>
                        <Select styles={{multiValueRemoved: true}} options={this.props.newsTypeOptions} onChange={this.props.newsTypeOnChange} isMulti/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Location</Form.Label>
                        <Select options={this.props.locations} onChange={this.props.locationOnChange} isMulti/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Property Type</Form.Label>
                        <Select options={this.props.propertyTypes} onChange={this.props.propertyTypeOnChange} isMulti />
                    </Form.Group>
                </Row>
            </Form>
        );
    }
}
export default NewsFilter;