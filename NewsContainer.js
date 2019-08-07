import React, { Component } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import NewsFilter from './NewsFilter';
import NewsArticle from './NewsArticle';
import _ from "lodash";
import './NewsContainer.css'

class NewsContainer extends Component {

    constructor(props) {
        super(props);

        //handlers
        this.updateLocation = this.updateLocation.bind(this);
        this.updateNewsType = this.updateNewsType.bind(this);
        this.updatePropertyType = this.updatePropertyType.bind(this);
        this.updateKeyword = this.updateKeyword.bind(this);
        this.updateArticlesOnScreen = this.updateArticlesOnScreen.bind(this);

        //state
        this.state = {
            data: {
                articles: [],
                filteredArticles: [],
                newsTypeOptions: [],
                locations: [],
                propertyTypes: [],
                filteredByKeyword: [],
                filteredByNewsType: [],
                filteredByLocation: [],
                filteredByPropertyType: []
            }
        };
    }

    updateKeyword(e) {
        let keyword = '';
        let currentArticles = [];
        if (e !== null && e !== undefined) {
            keyword = e.target.value;
            currentArticles = this.state.articles.filter(article => {
                return article.props.title.toLowerCase().includes(keyword.toLowerCase()) || article.props.content.toLowerCase().includes(keyword.toLowerCase());
            })
        } else if (e === null || e === '') {
            currentArticles = this.state.articles;
        }
        this.setState({ filteredByKeyword: _.uniq(currentArticles) }, () => { this.updateArticlesOnScreen() });
    }

    updateNewsType(e) {
        console.log(this.state.filteredByKeyword);
        let newsType = []
        let currentArticles = [];
        if (e !== null && e !== undefined) {
            newsType = _.uniq(e.map(value => { return (value.value) }));
            newsType.forEach(newsType => {
                currentArticles.push(...this.state.articles.filter(article => {
                    return article.props.newsType.includes(newsType);
                }));
            });
        } else if (e === null || e === []) {
            currentArticles = this.state.articles;
        }
        this.setState({ filteredByNewsType: _.uniq(currentArticles) }, () => { this.updateArticlesOnScreen() });
    }

    updateLocation(e) {
        let location = []
        let currentArticles = [];
        if (e !== null && e !== undefined) {
            location = _.uniq(e.map(value => { return (value.value) }));
            location.forEach(location => {
                currentArticles.push(...this.state.articles.filter(article => {
                    return article.props.location === location;
                }));
            });
        } else if (e === null || e === []) {
            currentArticles = this.state.articles;
        }
        this.setState({ filteredByLocation: currentArticles }, () => { this.updateArticlesOnScreen() });
    }

    updatePropertyType(e) {
        let propertyType = []
        let currentArticles = [];
        if (e !== null && e !== undefined) {
            propertyType = _.uniq(e.map(value => { return (value.value) }));
            propertyType.forEach(propertyType => {
                currentArticles.push(...this.state.articles.filter(article => {
                    return article.props.propertyType.includes(propertyType);
                }));
            });
        } else if (e === null || e === []) {
            currentArticles = this.state.articles;
        }
        this.setState({ filteredByPropertyType: _.uniq(currentArticles) }, () => { this.updateArticlesOnScreen() });
    }


    updateArticlesOnScreen() {
        let keywordFilteredArticles = this.state.filteredByKeyword || this.state.articles;
        let newsTypeFilteredArticles = this.state.filteredByNewsType || this.state.articles;
        let locationFilteredArticles = this.state.filteredByLocation || this.state.articles;
        let propertyTypeFilteredArticles = this.state.filteredByPropertyType || this.state.articles;
        let allFilters = _.intersection(keywordFilteredArticles, newsTypeFilteredArticles, locationFilteredArticles, propertyTypeFilteredArticles);
        this.setState({ filteredArticles: allFilters });
    }

    componentDidMount() {
        fetch('news-articles.json')
            .then(res => {
                return res.json();
            })
            .then(data => {
                let articles = data.articles.map((article) => {
                    return (
                        <NewsArticle
                            key={article.id}
                            title={article.title}
                            image={article.urlToImage}
                            imageAltText={article.imageAltText}
                            content={article.content}
                            location={article.location}
                            newsType={article.newsType}
                            propertyType={article.propertyType}
                        />
                    )
                }
                );
                //Extract News Type Options
                let newsTypeOptions = data.articles.map((article) => {
                    return (
                        article.newsType.map((newsTypeOption) => { return ({ newsTypeOption }) })
                    )
                });
                newsTypeOptions = _.uniqBy(_.flattenDeep(newsTypeOptions), "newsTypeOption");
                let newsTypeOptionOptions = newsTypeOptions.map((newsType, index) => { return ({ value: newsType.newsTypeOption, label: newsType.newsTypeOption }) })

                //Extract Locations
                let locations = data.articles.map((article) => { return (article.location) });
                locations = _.uniq(locations);
                let locationOptions = locations.map((location, index) => { return ({ value: location, label: location }) });

                //Extract Property Types
                let propertyTypeOptions = data.articles.map((article) => {
                    return (
                        article.propertyType.map((propertyTypeOption) => { return ({ propertyTypeOption }) })
                    )
                });
                propertyTypeOptions = _.uniqBy(_.flattenDeep(propertyTypeOptions), "propertyTypeOption");
                let propertyTypeOptionOptions = propertyTypeOptions.map((prop, index) => { return ({ value: prop.propertyTypeOption, label: prop.propertyTypeOption }) })

                this.setState({
                    articles: articles,
                    filteredArticles: articles,
                    newsTypeOptions: newsTypeOptionOptions,
                    locations: locationOptions,
                    propertyTypes: propertyTypeOptionOptions,
                });
            })
            .catch(error => console.error('Error:', error));
    };

    render() {
        return (
            <div>
                <Jumbotron fluid>
                    <Container>
                        <h1>News</h1>
                    </Container>
                    <Container>
                        <NewsFilter
                            newsTypeOptions={this.state.newsTypeOptions}
                            newsTypeOnChange={this.updateNewsType}
                            locations={this.state.locations}
                            locationOnChange={this.updateLocation}
                            propertyTypes={this.state.propertyTypes}
                            propertyTypeOnChange={this.updatePropertyType}
                            keywordOnChange={this.updateKeyword}
                        />
                    </Container>
                </Jumbotron>
                <Container>
                    <ul className="list-unstyled">
                        {this.state.filteredArticles}
                    </ul>
                </Container>
            </div>);
    }
}
export default NewsContainer;