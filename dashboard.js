var Dashboard = require('./Dashboard');
var Comments = require('./Comments');

var CommentsWrapper = React.createClass({
  render: function () {
    return (
        <Comments myprop="myvalue" />
    );
  }
});

var Index = React.createClass({
  render: function () {
    return (
        <div>
            <header>Some header</header>
            <RouteHandler />
        </div>
    );
  }
});

var routes = (
  <Route path="/" handler={Index}>
    <Route path="comments" handler={CommentsWrapper}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
