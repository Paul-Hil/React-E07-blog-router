// == Import
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Composants
import Header from 'src/components/Header';
import Posts from 'src/components/Posts';
import Footer from 'src/components/Footer';
import NotFound from 'src/components/NotFound';
import Spinner from 'src/components/Spinner';

// data, styles et utilitaires
import categoriesData from 'src/data/categories';
import postsData from 'src/data/posts';
import './styles.scss';

// == Composant
const Blog = () => {
  const [zenMode, setZenMode] = useState(false);
  const [loader, setLoader] = useState(false);
  const [dataLoad, setDataLoad] = useState(false);

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getPostByCategory = (category) => {
    let results;

    if(category === "Accueil") {
      results = posts;
    } else {
      results = postsData.filter((post) => post.category === category);
    }

    return results;
  }

  const loadData = () => {
    setLoader(true);
    const axios = require('axios');
    
    // const test = new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.open("GET", "https://oclock-open-apis.vercel.app/api/blog/categories");
    //   xhr.onload = () => resolve(xhr.responseText);
    //   xhr.onerror = () => reject(xhr.statusText);
    //   xhr.send();
    // });

      axios.get('https://oclock-open-apis.vercel.app/api/blog/categories')
      .then(function (response) {
        const categories = response.data;
        setCategories(categories);
      })
      .catch(function (error) {
        console.log(error);
      });


      axios.get('https://oclock-open-apis.vercel.app/api/blog/posts')
      .then(function (response) {
        const posts = response.data;
        setPosts(posts);
        setLoader(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  };

  useEffect(() => {
    if(dataLoad === false) {
      setDataLoad(true);
      loadData();
    }
    //return console.log("Data loads");
  });

    // composant Switch : si on englobe des Routes dans un Switch, alors seule la
    // première route qui correspond à l'URL est utilisée 

    // composant Redirect : redirige une URL vers une autre URL 
    //loadPosts();

    return (
      <div className="blog">
        <Header categories={categories} isZenMode={zenMode} updateZenMode={setZenMode}/>

        <Switch>
          <Redirect from="/jquery" to="/autre" /> 

          {loader && 
            <Route>
                <Spinner />
            </Route>
          }

          {categoriesData.map((category) => (
            <Route path={category.route} exact key={category.label}>
              <Posts posts={getPostByCategory(category.label)} isZenMode={zenMode} />
            </Route>
            ))}

          <Route>
            <NotFound />
          </Route>
        </Switch>

        <Footer />
      </div>
    ); 
};

// == Export
export default Blog;
