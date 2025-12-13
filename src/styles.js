const yagcStyles = `.gh-card {
  position: relative;
  display: inline-block;
  background: var(--body-bg);
  border-radius: 1rem;
  box-shadow:  0 12px 13px rgba(0,0,0,.16), 0 12px 13px rgba(0,0,0,.16);
  font-family: helvetica, arial, 'system-ui';
  text-align: center;
  padding: 1em 1em;
  margin: 1rem 1rem;
  min-width: 300px;
  transition: all .5s;
  div, h1 {
    margin: 0;
  }
  h1 {
    font-size: 1em;
  }
  .location,
  p {
    color: var(--body-color);
    font-size: 0.9em;
    margin: auto;
  }
  a {
    color: var(--body-color-a);
    text-decoration: none;

    &:hover {
      filter: drop-shadow(3px 1px 3px #999)
    }
  }
  a.created_at {
    position: relative;
    float: left;
    z-index: 1;

    img {
      height: 2.5em;
      width: auto;
    }

    img:hover {
      filter: drop-shadow(3px 1px 3px #999)
    }
  }
  #list-resources {
    list-style: none;
    text-align: left;
    padding: 17px 9px;
    position: absolute;
    float: left;
    z-index: 1;

    li {
      font-size: 0.8em;
      color: #ffffff;
      padding-bottom: 6px;
      a {
        color:  #ffffff;
      }
      span {
        margin-left: 5px;
        vertical-align: super;
      }
      img:hover {
        filter: drop-shadow(3px 1px 3px #999)
      }  
    }
  }
  .since {
    color: #FFF;
    font-size: 0.8em;
    margin-left: 3em;
    line-height: 3em;
    position: absolute;
    left: 2em;
  }

  a.info {
    position: relative;
    float: right;
    z-index: 1;

    img {
      height: 1.2em;
      width: auto;
    }

    img:hover {
      filter: drop-shadow(3px 1px 3px #999)
    }
  }
  .cover {
    height: 11rem;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-position: bottom;
    background-repeat: round;
    border-radius: 1rem 1rem 0 0;
  }
  .name {
    font-size: 1.5em;
  }
  .login {
    color: var(--body-color);
    margin-bottom: 1rem;
  }
  .avatar {
    position: relative;
    padding: 4rem 0 0 0;

    img {
      font-size: 2em;
      height: auto;
      width: 5em;
      border-radius: 50%;
      border: 3px solid var(--avatar-border-color);
      filter: drop-shadow(0 0 10px var(--avatar-border-color));
    }
  }
  .stars {
    top: 10em;
    position: absolute;
    width: 4em;
    height: 4em;
    right: 15%;
    display: inline;
    background: no-repeat url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve"><defs></defs><g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" ><path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c -1.398 0 -2.649 0.778 -3.268 2.031 L 29.959 27.911 c -0.099 0.2 -0.29 0.338 -0.51 0.37 L 3.122 32.107 c -1.383 0.201 -2.509 1.151 -2.941 2.48 c -0.432 1.329 -0.079 2.76 0.922 3.736 l 19.049 18.569 c 0.16 0.156 0.233 0.38 0.195 0.599 L 15.85 83.71 c -0.236 1.377 0.319 2.743 1.449 3.564 c 1.129 0.821 2.6 0.927 3.839 0.279 l 23.547 -12.381 c 0.098 -0.051 0.206 -0.077 0.314 -0.077 C 51.721 53.905 50.301 28.878 45 2.024 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,200,80); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /><path d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c 1.398 0 2.649 0.778 3.268 2.031 l 11.773 23.856 c 0.099 0.2 0.29 0.338 0.51 0.37 l 26.326 3.826 c 1.383 0.201 2.509 1.151 2.941 2.48 c 0.432 1.329 0.079 2.76 -0.922 3.736 L 69.847 56.892 c -0.16 0.156 -0.233 0.38 -0.195 0.599 L 74.15 83.71 c 0.236 1.377 -0.319 2.743 -1.449 3.564 c -1.129 0.821 -2.6 0.927 -3.839 0.279 L 45.315 75.172 c -0.098 -0.051 -0.206 -0.077 -0.314 -0.077 C 37.08 54.593 38.849 29.395 45 2.024 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,220,100); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" /></g></svg>');
    background-size: 4em;
    filter: drop-shadow(0 0 10px var(--avatar-border-color));
    z-index: 1;

    span {
      color: var(--stars-color);
      font-size: 1.2em;
      font-weight: bold;
      line-height: 4em;
      text-align: center;
    }
  }
  .footer {
    border-top: 2px solid var(--stats-name-color);
    padding: 1rem 0 0 0;

    .item {
      color: var(--body-color);
    }
  }
  .grid-3 {
    .item {
      font-size: 1em;
      width: 33%;
      .total {
        font-size: 2.4rem;
      }
    }
  }
  .grid-4 {
    .item {
      font-size: .8em;
      width: 25%;
      .total {
        font-size: 2rem;
      }
    }
  }
  #list-items,
  #list-social {
    display: contents;
    list-style: none;
    padding: 0;

    li {
      display: inline-block;
      span,
      a {
        font-size: 2em;
      }
      a:hover {
        filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 1));
      }
      p {
        font-size: 0.7em!important;
        color: var(--stats-name-color);
      }
    }
    li:not(:last-child) {
      margin-right: 2rem;
    }
  }
}
#list-items {
  li {
    span {
      color: var(--body-color);;
    }
  }
}
#list-social {
  li {
    img {
      filter: var(--svg-color-a);
    }
  }
}
@media (min-width:400px) {
  .gh-card {
    .stars {
      right: 25%;
    }
  }
}
@media (max-width:468px) {
  .location {
    display: none;
  }
  #list-social {
    li {
      margin-top: 10px;
    }
  }
}
@media (min-width:724px) {
  .gh-card {
    max-width: 1200px;
    width: 90%;
    .cover {
      height: 15rem;
      width: 100%;
    }
    .avatar {
      position: relative;
      padding: 4rem 0 0 0;

      img {
        width: 6em;
      }
    }
    .stars {
      top: 12em;
      background-size: 4em;
      right: 35%;
      z-index: 1;
    }
    #list-social {
      display: block;
    }  
  }
}

@media (min-width:1024px) {
  .gh-card {
    .stars {
      right: 39%;
    }
  }
}`;

export default yagcStyles;