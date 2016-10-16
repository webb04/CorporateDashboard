import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'
import stylesArray from './style.js'

const Query = (props) => (
  <h2>{props.location.query.message}</h2>
)

const Instagram = () => <h3>Instagram Feed</h3>
const TwitterFeed = () => <h3>Twitter Feed</h3>

class geospatial extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch('http://localhost:3000/src/data/employeeLocations.json')
      .then(function(response) {
         return response.json();
      }).then(function(response) {
        console.log(response);
          var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 51.50735, lng: -0.12776},
            zoom: 12,
            styles: stylesArray
          });

          var contentStringStrand = '<div id="content">'+
                 '<div id="siteNotice">'+
                 '</div>'+
                 '<h1 id="firstHeading" class="firstHeading">' + response[0].name + '</h1>'+
                 '<div id="bodyContent">'+
                 response[0].employees +
                 'Employees</div>'+
                 '</div>';

           var infowindowStrand = new google.maps.InfoWindow({
             content: contentStringStrand,
             maxWidth: 200
           });

           var strandMarker = new google.maps.Marker({
             position: {lat: 51.51102, lng: -0.11718},
             map: map,
             title: 'Strand'
           });

           strandMarker.addListener('click', function() {
             infowindowStrand.open(map, strandMarker);
           });

           var contentStringCity = '<div id="content">'+
                  '<div id="siteNotice">'+
                  '</div>'+
                  '<h1 id="firstHeading" class="firstHeading">' + response[1].name + '</h1>'+
                  '<div id="bodyContent">'+
                  response[1].employees +
                  'Employees</div>'+
                  '</div>';

            var infowindowCity = new google.maps.InfoWindow({
              content: contentStringCity,
              maxWidth: 200
            });

            var cityMarker = new google.maps.Marker({
              position: {lat: 51.513310, lng: -0.087483},
              map: map,
              title: 'City'
            });

            cityMarker.addListener('click', function() {
              infowindowCity.open(map, cityMarker);
            });

            var contentStringKnightsbridge = '<div id="content">'+
                   '<div id="siteNotice">'+
                   '</div>'+
                   '<h1 id="firstHeading" class="firstHeading">' + response[2].name + '</h1>'+
                   '<div id="bodyContent">'+
                   response[2].employees +
                   'Employees</div>'+
                   '</div>';

             var infowindowKnightsbridge = new google.maps.InfoWindow({
               content: contentStringKnightsbridge,
               maxWidth: 200
             });

             var knightsbridgeMarker = new google.maps.Marker({
               position: {lat: 51.502826, lng: -0.192089},
               map: map,
               title: 'Knightsbridge'
             });

             knightsbridgeMarker.addListener('click', function() {
               infowindowKnightsbridge.open(map, knightsbridgeMarker);
             });
      }).catch(function(err) {

      });

  }

  mapClick() {

  }

  render() {
    return (
      <div id="geospatial">
        <div id='map'></div>
        <div id="capture" onClick={() => { this.mapClick() }}></div>
      </div>
    )
  }
}

export default geospatial;
