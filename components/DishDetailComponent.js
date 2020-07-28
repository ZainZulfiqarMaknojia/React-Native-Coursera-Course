import React ,{ Component } from 'react';
import { Text, View , ScrollView, FlatList ,Modal, StyleSheet , Button} from 'react-native';
import { Card , Icon , Input  ,Rating, AirbnbRating } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite , postComment} from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }
  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId , rating , author,comment) => dispatch(postComment(dishId , rating , author,comment))
})  

class Dishdetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            rating: 1,
            Author: null,
            comment:null,
            dishID: 1
        }
    }
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReview(dishId) {
        console.log(JSON.stringify(this.state));
        this.props.postComment(dishId, this.state.rating, this.state.comment, this.state.Author);
        this.toggleModal();
    }        

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()}  
                    />
                    <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>


                    <AirbnbRating
                    count={5}
                    reviews={["Rating:1/5", "Rating:2/5", "Rating:3/5", "Rating:4/5", "Rating:5/5"]}
                    defaultRating={5}
                    onFinishRating={(itemValue, itemIndex) => this.setState({rating: itemValue})}
                    size={20}
                    />
                    <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user'  }}
                        onChangeText={(value) => this.setState({Author: value})}
                        />
                    <Input
                        placeholder='Comment'
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        onChangeText={(value) => this.setState({comment: value})}
                        />
                    <Button
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                        onPress={() => this.handleReview(dishId)}
                    />
                    <Button
                        title="Cancel"
                        color="#808080"
                        accessibilityLabel="Learn more about this purple button"
                        onPress={() => this.toggleModal()}
                    />                    
                    </View>
                    </Modal>                    
                <RenderComments state = {this.state}
                comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}  />
            </ScrollView>            
        );
    }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                    <Icon
                    raised
                    reverse
                    name='pencil'
                    type='font-awesome'
                    color='#512DA8'
                    onPress={() => {props.toggleModal();}}/>                     
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}


const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }    
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);