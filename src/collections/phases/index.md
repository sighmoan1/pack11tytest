---
title: Phases of deployment
nav:
  order: 8
---

There are the phases of deployment

<div class="stack">

{% for entry in collections.phases %}
  <article class="phases">
    <h2 class="phases__title"><a href="{{ entry.url }}">{{ entry.data.title }}</a></h2>
  </article>
{% endfor %}

</div>
