---
layout: post
title:  "Utility of Data Visualization"
date:   2018-01-21 13:00:11 -0800
categories: vis editorial explanations
---

There are many times where I have been asked to furnish an explanation of the utility of data visualization, and what its goals are.  I've recently read a blog post by David Robinson where he [describes the difference between data science, machine learning, and artificial intelligence](http://varianceexplained.org/r/ds-ml-ai/).  It's a great post that distills the difference down into simplistic terms, then explains some of the nuances between them.  In short:

> * Data science produces insights
> * Machine learning produces predictions
> * Artificial intelligence produces actions

I'd like to suss out the role of visualization in the "data science" process, particularly its role in *producing insights*, which can be a wildly mis-used term in practice.  Other researchers ([Robert Kosara](https://eagereyes.org/criticism/definition-of-visualization)) and practitioners ([...who?!?]) have taken a stab at this, and other onlne communities (e.g, [/r/dataisbeautiful](https://www.reddit.com/r/dataisbeautiful/wiki/index#wiki_what_is_a_data_visualization.3F)) have adapted these definitions.  

I'll take the stance of what data visualization isn't, and present three ideas of what I believe it is.  

* To answer a specific question, you don't need a data visualization.
* A data visualization supplies context
* A data visualization is a high-bandwidth connection to the brain
* A data visualization is informative

The rationale for these definitions is to delineate why one would use or create a data visualization, and to clarify how the design decisions that go into a data visualization can influence what a viewer can take away from a visualization.

## To answer a specific question, you don't need a data visualization.

If what you're interested in is a specific metric or a specific aggregation, you don't need a data visualization.  There is a cost to create a data visualization: it takes time to make, and can be time-consuming for the viewer to comprehend (especially if they have to [learn a chart type they have not encountered before](##link???)).  A number returned from a SQL query or a simple set of summing aggregations may be good enough.

There's probably a reason why many dashboards for business and administration use so-called *big-ass numbers* in their presentations.  The rationale for this is likely simple: these are the factors that are continually monitored, and the viewer has a good idea of what the numbers represent.  For someone else that is looking at the number without context---it's a little more confusing.  This brings us to the next point...

## A data visualization supplies context

  