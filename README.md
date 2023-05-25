# Welcome to our project!

## Overview

This project pretends to be an npm package to create a folder structure for a node typescript server using expressJS implementing clean architecture

## How to use it

run `npx folderforge start-project` to create the base structure of the project
then you'll be able to add modules using `npx folderforge add-module -n <module-name>`

## Example

1. `npx folderforge start-project`
2. `npx folderforge add-module -n users`
3. `npx folderforge add-module -n products`
4. `npx folderforge add-module -n orders`

## Folder Structure

#### This will be the result

<ul>
  <li>
      <details open>
          <summary>src</summary>
          <ul>
              <li>
                  <details>
                      <summary>core</summary>
                      <ul>
                          <li>config</li>
                          <li>middlewares</li>
                          <li>modules</li>
                          <li>routing</li>
                          <li>services</li>
                      </ul>
                  </details>
              </li>
              <li>
                  <details>
                      <summary>modules</summary>
                      <ul>
                          <li>
                              <details>
                                  <summary>users</summary>
                                  <ul>
                                      <li>
                                          <details>
                                              <summary>data</summary>
                                              <ul>
                                                  <li>datasource
                                                      <ul>
                                                          <li>pg_data_source.ts</li>
                                                      </ul>
                                                  </li>
                                                  <li>interfaces
                                                      <ul>
                                                          <li>customer_data_source.ts</li>
                                                      </ul>
                                                  </li>
                                                  <li>utils</li>
                                              </ul>
                                          </details>
                                      </li>
                                      <li>
                                          <details>
                                              <summary>domain</summary>
                                              <ul>
                                                  <li>models
                                                      <ul>
                                                          <li>customer_model.ts</li>
                                                      </ul>
                                                  </li>
                                                  <li>repositories
                                                      <ul>
                                                          <li>customer_repositories.ts</li>
                                                          <li>customer_repository_implementation.ts</li>
                                                      </ul>
                                                  </li>
                                              </ul>
                                          </details>
                                      </li>
                                      <li>
                                          <details>
                                              <summary>presentation</summary>
                                              <ul>
                                                  <li>customer_middlewares.ts</li>
                                                  <li>customer_router.ts</li>
                                                  <li>index.ts</li>
                                              </ul>
                                          </details>
                                      </li>
                                  </ul>
                              </details>
                          </li>
                          <li>
                              <p>...</p>
                          </li>
                      </ul>
                  </details>
              </li>
          </ul>
      </details>
  </li>
  <li>
      node_modules
  </li>
  <li>
      package-lock.json
  </li>
  <li>
      package.json
  </li>
  <li>
      tsconfig.json
  </li>
</ul>

## TODOs

- Implement `CustomError` types
- Implement `presentation` layer

## Colaborators

<ul>
  <li><a href="https://github.com/doggbmx/">Manu "El Father" Ortigoza</a></li>
   <li><a href="https://github.com/manucastelnovo/">Manu "Tiro Largo" Castelnovo</a></li>
   <li><a href="https://github.com/santiracca/">Santi "El Papa" Racca</a></li>
</ul>

### Happy Coding!
