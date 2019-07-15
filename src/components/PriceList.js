import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Picker} from 'react-native';

// https://facebook.github.io/react-native/docs/picker#onvaluechange

class PriceList extends Component {
  state = {
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
      {code: "USD", name: "USD", rate: 0.015},
      {code: "GBP", name: "GBP", rate: 0.012},
      {code: "EUR", name: "EUR", rate: 0.013},
    ],
    selectedCurrency: 'INR'
  };
  
  selectCurrency = (itemValue) => {
    var selected = this.state.currency.filter(item => item.code == itemValue);
    this.setState({selectedCurrency: itemValue});
    this.state.products.map((item) => {
      item.price = item.basePrice * selected[0].rate;
    })
    this.setState({products: this.state.products});
    
  }
  componentWillMount() {
    this.selectCurrency(this.state.selectedCurrency)
  }
  
  render() {
    return (
      <View>      
        <Picker
          selectedValue={this.state.selectedCurrency}
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
   }
})