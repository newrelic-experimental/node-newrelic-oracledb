[![New Relic Experimental header](https://github.com/newrelic/opensource-website/raw/master/src/images/categories/Experimental.png)](https://opensource.newrelic.com/oss-category/#new-relic-experimental)


![GitHub forks](https://img.shields.io/github/forks/newrelic-experimental/java-instrumentation-template?style=social)
![GitHub stars](https://img.shields.io/github/stars/newrelic-experimental/java-instrumentation-template?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/newrelic-experimental/java-instrumentation-template?style=social)

![GitHub all releases](https://img.shields.io/github/downloads/newrelic-experimental/java-instrumentation-template/total)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/newrelic-experimental/java-instrumentation-template)
![GitHub last commit](https://img.shields.io/github/last-commit/newrelic-experimental/java-instrumentation-template)
![GitHub Release Date](https://img.shields.io/github/release-date/newrelic-experimental/java-instrumentation-template)


![GitHub issues](https://img.shields.io/github/issues/newrelic-experimental/java-instrumentation-template)
![GitHub issues closed](https://img.shields.io/github/issues-closed/newrelic-experimental/java-instrumentation-template)
![GitHub pull requests](https://img.shields.io/github/issues-pr/newrelic-experimental/java-instrumentation-template)
![GitHub pull requests closed](https://img.shields.io/github/issues-pr-closed/newrelic-experimental/java-instrumentation-template)


# [Project Name - use format "newrelic-java-<name>"] [build badges go here when available]

>[Brief description - what is the project and value does it provide? How often should users expect to get releases? How is versioning set up? Where does this project want to go?]

## Value 

|Metrics | Events | Logs | Traces | Visualization | Automation |
|:-:|:-:|:-:|:-:|:-:|:-:|
|:x:|:x:|:x:|:white_check_mark:|:x:|:x:|

### List of Metrics,Events,Logs,Traces 
|Name | Type | Description |
|:-:|:-:|:-:|
|*metric.name* | Metric| *description*|
|*event.name* | Event|  *description*|
|*log.name* | Log|  *description*|
|*trace.name*| Trace| *description*
|---|---|---|

  
## Installation

New Relic's experimental nodejs oracle database instrumentation for use with the
[Node agent](https://github.com/newrelic/node-newrelic). This module is a
dependency of the agent and is installed with it by running:

```
npm install @newrelic-labs/oracledb
```

Then require it in your code immediately after the require('newrelic') line

```js
// index.js
require('@newrelic-labs/oracledb')
```

## Support

New Relic has open-sourced this project. This project is provided AS-IS WITHOUT WARRANTY OR DEDICATED SUPPORT. Issues and contributions should be reported to the project here on GitHub.

We encourage you to bring your experiences and questions to the [Explorers Hub](https://discuss.newrelic.com) where our community members collaborate on solutions and new ideas.

## Contributing

We encourage your contributions to improve node-newrelic-oracledb! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project. If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company, please drop us an email at opensource@newrelic.com.

**A note about vulnerabilities**

As noted in our [security policy](../../security/policy), New Relic is committed to the privacy and security of our customers and their data. We believe that providing coordinated disclosure by security researchers and engaging with the security community are important means to achieve our security goals.

If you believe you have found a security vulnerability in this project or any of New Relic's products or websites, we welcome and greatly appreciate you reporting it to New Relic through [HackerOne](https://hackerone.com/newrelic).

## License

node-newrelic-oracledb is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.

>[If applicable: node-newrelic-oracledb also uses source code from third-party libraries. You can find full details on which libraries are used and the terms under which they are licensed in the third-party notices document.]
