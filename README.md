# Tech blog

**Read the blog at https://aqiaojoe08.github.io/blog/**

The `.html` files in this repo are the source for each post. GitHub shows them as raw code, so use the link above to read them as pages.

## Posts

- [Easing the Human on the Loop When You Cannot Be Close to the Details](https://aqiaojoe08.github.io/blog/easing-the-human-on-the-loop.html) (2026-11-22)
- [From Merge Queues to Merge Plans: What OpenAI’s and Anthropic’s Git Rewrites Leave Unsolved](https://aqiaojoe08.github.io/blog/from-merge-queues-to-merge-plans.html) (2026-11-19)
- [Everything as Code, Reviewed by Agents: Ending Fragmentation in a Federated Architecture](https://aqiaojoe08.github.io/blog/everything-as-code-reviewed-by-agents.html) (2026-11-17)
- [Stateless Apps, Central Data: What the Agentic Ecosystem Is Missing](https://aqiaojoe08.github.io/blog/stateless-apps-central-data.html) (2026-11-17)
- [Innovation Tree: From Fragmented Innovation to Collective Innovation](https://aqiaojoe08.github.io/blog/innovation-tree.html) (2026-11-14)
- [Faster Decisions in Complex Systems with LLMs and World Models](https://aqiaojoe08.github.io/blog/llm-world-model-decision-making.html) (2026-11-14)
- [The Cache Inversion: Software Is Becoming a Cache of Data](https://aqiaojoe08.github.io/blog/software-is-a-cache-of-data.html) (2026-11-12)
- [Slice by Intent (10x+), Not by Phase (2x)](https://aqiaojoe08.github.io/blog/slice-by-intent-not-by-phase.html) (2026-11-12)
- [Two Ways to Verify Software: Sample the Behavior, or Prove It](https://aqiaojoe08.github.io/blog/testing-is-sampling-proof-is-proof.html) (2026-11-04)
- [Software Factories for Brownfield Code at Amazon Scale](https://aqiaojoe08.github.io/blog/software-factories-for-brownfield.html) (2026-10-11)
- [Agent Memory Is a Team Document, Not a Personal Recall](https://aqiaojoe08.github.io/blog/agent-memory-is-a-team-document.html) (2026-10-05)
- [The Missing Layer Between Prose and Code: What STE and SQL Teach Us About Specs](https://aqiaojoe08.github.io/blog/the-missing-layer-between-prose-and-code.html) (2026-08-07)

## Papers

- [NCSLab: A Web-Based Global-Scale Control Laboratory With Rich Interactive Features](https://aqiaojoe08.github.io/blog/papers/ncslab-ieee-tie-2010.pdf) (PDF). IEEE Transactions on Industrial Electronics, vol. 57, no. 10, 2010. [DOI](https://doi.org/10.1109/TIE.2009.2027924)

## Analytics pilot

[Open Google Analytics](https://analytics.google.com/) and select the web stream with measurement ID `G-WGBN2HRTQ1`. The dashboard requires your Google account and Analytics access; the homepage link does not expose reports publicly.

The pilot is limited to `innovation-tree.html` and `llm-world-model-decision-making.html`. Both load the shared `assets/analytics-consent.js` and CSS. No Google tag loads on the homepage, the privacy page, other articles, or local previews.

The supplied container `GTM-5P9HJM99` is loaded only after analytics consent. Its published configuration was checked and contains GA4 destination `G-WGBN2HRTQ1`. Do not add a second Google tag snippet or a noscript GTM iframe: that would bypass the consent gate or double-count pageviews. The consent script uses the current Google installation format and leaves destination routing to the container.

Advertising consent stays denied. Consent choices expire after 180 days, and the script requests host-only analytics cookies under `/blog/` with the `blog` prefix and a maximum 180-day lifetime. The Privacy page and article footers let visitors change their choice. Revocation opts out of GA4, removes these cookies, and reloads an active pilot page to stop its timers and listeners. Denial also propagates to open tabs through browser storage events.

Before extending the pilot, review the GTM container and GA4 settings. Keep advertising and user-provided-data collection off, retain only the enhanced-measurement events you need, and choose an appropriate event-retention period in Analytics. The website consent gate does not replace reviewing future container changes.

### Verify after deployment

1. Open each pilot article in a fresh browser context. Before choosing, Network should show no Google tag or Analytics requests.
2. Reject analytics, then reload. No Google tag or Analytics requests should appear.
3. Open Analytics choices and accept. The container should load once, with pageviews routed to `G-WGBN2HRTQ1`. Check Realtime or DebugView in GA4.
4. Reopen Analytics choices and reject. The page reloads, `blog_ga` cookies are cleared, and subsequent visits stay untracked.
5. Check the homepage and another article: neither should load the Google tag, even after acceptance on a pilot article.

References: [Google's current installation snippet](https://support.google.com/tagmanager/answer/14847097), [consent mode](https://developers.google.com/tag-platform/security/guides/consent), and [confirm data collection](https://support.google.com/analytics/answer/9333790).
