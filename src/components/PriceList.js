import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Picker, ScrollView} from 'react-native';

// https://facebook.github.io/react-native/docs/picker#onvaluechange

import Loader from './Loader';

class PriceList extends Component {
  state = {
    loading: true,
    products: [
      {name: "Product A", basePrice: 1000},
      {name: "Product B", basePrice: 100},
      {name: "Product C", basePrice: 2000},
      {name: "Product D", basePrice: 3000},
      {name: "Product E", basePrice: 4000},
      {name: "Product F", basePrice: 5000},
      {name: "Product G", basePrice: 6000}
    ],
    currency: [
      {code: "INR", name: "INR",  rate: 1},
    ],
    selectedCurrency: 'INR'
  };
  
  selectCurrency = (itemValue) => {
    var selected = this.state.currency.filter(item => item.code == itemValue);
    this.setState({selectedCurrency: itemValue});
    this.state.products.map((item) => {
      item.price = (item.basePrice * selected[0].rate).toFixed(2);
    })
    this.setState({products: this.state.products});
    
  }
  componentWillMount() {
    fetch('https://api.exchangeratesapi.io/latest?base=INR', {method: 'GET'})
     .then((response) => response.json())
     .then((responseJson) => {
        this.state.currency = [];
        for (const [key, value] of Object.entries(responseJson.rates)) {
          this.state.currency.push({code: key, name: key,  rate: value});
        }
        this.setState({
           loading: false,
           currency: this.state.currency
        })
     })
     .catch((error) => {
        console.error(error);
     });
    
    this.selectCurrency(this.state.selectedCurrency)
  }
  
  render() {
    return (
      <View>
        <Loader loading={this.state.loading} />
        <ScrollView>
        <Picker
          selectedValue = {this.state.selectedCurrency}
          style = {styles.container}
          onValueChange = {(itemValue, itemIndex) => this.selectCurrency(itemValue)}
            >
            { 
              this.state.currency.map((item, index) => (
                <Picker.Item label={item.code.toString()} value={item.name} />
              ))
            }
        </Picker>

        {
            this.state.products.map((item, index) => (
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}>
                     <Text style = {styles.text}>
                        {item.name}
                     </Text>
                     <Text style = {styles.price}>
                        Price: {item.price} {this.state.selectedCurrency}
                     </Text>
                  </TouchableOpacity>
               ))
        } 
        </ScrollView>
      </View>
    )
  }
}

export default PriceList;

const styles = StyleSheet.create ({
  picker: {
      width:500,
      alignItems: 'center',
      backgroundColor: '#f0efef',
  },
  container: {
      width:500,
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c',
   },
   price: {
      color: '#db1616'
   },
   loader: {
     padding:0,
     margin:0
   }
})