import React, { Component } from 'react';
import { CURRENCY_TYPES } from '../Constants';
import Select from '../components/Select';
import Input from '../components/Input';
import {get} from '../apis/apiHelper';
import {Container, Row, Col} from 'reactstrap';

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputValue: 0,
      outputValue: 0,
      fromCurrency: 'INR',
      toCurrency: 'USD'
    };
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleOnOutputChange = this.handleOnOutputChange.bind(this);
    this.handleSelectInputChange = this.handleSelectInputChange.bind(this);
    this.handleSelectOutputChange = this.handleSelectOutputChange.bind(this);
  }

  handleOnInputChange(inputValue){
    this.convertCurrency(inputValue, this.state.outputValue, this.state.fromCurrency, this.state.toCurrency, true);
    this.setState({inputValue})
  }

  handleOnOutputChange(outputValue){
    this.convertCurrency(this.state.inputValue, outputValue, this.state.fromCurrency, this.state.toCurrency);
    this.setState({outputValue})
  }

  handleSelectInputChange(fromCurrency){
    this.convertCurrency(this.state.inputValue, this.state.outputValue, fromCurrency, this.state.toCurrency, true);
    this.setState({fromCurrency})
  }

  handleSelectOutputChange(toCurrency){
    this.convertCurrency(this.state.inputValue, this.state.outputValue, this.state.fromCurrency, toCurrency)
    this.setState({toCurrency})
  }

  convertCurrency(inputValue, outputValue, fromCurrency, toCurrency, inputApi=false){
    if(inputApi){
      this.fetchForInput(inputValue, outputValue, fromCurrency, toCurrency);
    }else{
      this.fetchForOutput(inputValue, outputValue, fromCurrency, toCurrency);
    }
  }

  fetchForInput(inputValue, outputValue, fromCurrency, toCurrency){
    get(`latest?base=${fromCurrency}&symbols=${toCurrency}`).then(res => {
      let rate = res.rates[toCurrency];
      let converter = inputValue * rate
      this.setState({outputValue: converter})
    }).catch((err) => {
      console.log("Error", err.message)
    })
  }

  fetchForOutput(inputValue, outputValue, fromCurrency, toCurrency){
    get(`latest?base=${toCurrency}&symbols=${fromCurrency}`).then(res => {
      let rate = res.rates[fromCurrency];
      let converter = outputValue * rate
      this.setState({inputValue: converter})
    }).catch((err) => {
      console.log("Error", err.message)
    })
  }

  render(){
    return(
        <Container>
          <Row className='mt-3'>
            <Col md={2}>
              <Select options={CURRENCY_TYPES} handleOnChange={this.handleSelectInputChange} value={this.state.fromCurrency}/>
            </Col>
            <Col md={2}>
              <Input inputType="number" value={this.state.inputValue} handleOnChange={this.handleOnInputChange}/>
            </Col>
            <p>To</p>
            <Col md={2}>
              <Select options={CURRENCY_TYPES} handleOnChange={this.handleSelectOutputChange} value={this.state.toCurrency}/>
            </Col>
            <Col md={2}>
              <Input inputType="number" value={this.state.outputValue} handleOnChange={this.handleOnOutputChange}/>
            </Col>
          </Row>
        </Container>
        )
  }
}

export default Form;
