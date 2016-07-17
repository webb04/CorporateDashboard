import styles from './app.css';
import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute, IndexLink } from 'react-router'

import geospatialRoute from './geospatial'
import keyMetricsRoute from './keyMetrics'
import dataViewRoute from './dataView'

import stylesArray from './style.js'

class App extends Component {

  componentDidMount() {
    fetch('http://localhost:3000/src/data/employeeLocations.json')
    .then(function(response) {
    	 return response.json();
    }).then(function(response) {

      response.map(location => {
        console.log(location);
      })

    }).catch(function(err) {
    	// Error :(
    });
  }
}

browserHistory.listen(function(ev) {
  console.log('listen', ev.pathname);

  if (ev.pathname.toString() == "/geospatial") {

    setTimeout(function(){
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.50735, lng: -0.12776},
        zoom: 12,
        styles: stylesArray
      });

      var contentStringStrand = '<div id="content">'+
             '<div id="siteNotice">'+
             '</div>'+
             '<h1 id="firstHeading" class="firstHeading">Strand</h1>'+
             '<div id="bodyContent">'+
             '</div>'+
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
              '<h1 id="firstHeading" class="firstHeading">City</h1>'+
              '<div id="bodyContent">'+
              '</div>'+
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
               '<h1 id="firstHeading" class="firstHeading">Knightsbridge</h1>'+
               '<div id="bodyContent">'+
               '</div>'+
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


    }, 0);
  }
});

export default App
