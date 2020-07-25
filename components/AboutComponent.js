import React, { Component } from 'react';
import { Card , ListItem } from 'react-native-elements';
import { View , ScrollView, Text ,Image , FlatList} from 'react-native';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';



const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
}  

class About extends Component{
   
    static navigationOptions = {
        title: 'About'
    };

    render(){

            const Leaders= this.props.leaders.leaders.map((Leaders)=>{
                
                return (
                    <ListItem
                    key = {Leaders.id}
                    title={Leaders.name}
                    subtitle={
                        <Text>{Leaders.description}</Text>} 
                    hideChevron={true}
                    leftAvatar={{source:{uri: baseUrl + Leaders.image}}}/>                   
                );
            });
        return(
            <ScrollView>
                <Card title= "Our History">
                    <Text
                        style={{margin: 10}}>
                        Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.   
                    </Text>
                    <Text
                        style={{margin: 10}}>
                        The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.   
                    </Text>                             
                </Card> 
                <Card title= "Corporate Leadership">
                    {Leaders}
                </Card> 
            </ScrollView>      
        );
    }
}

export default connect(mapStateToProps)(About);