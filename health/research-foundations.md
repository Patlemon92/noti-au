# Neeve Research Foundations

A living document of the peer-reviewed evidence that grounds every design decision, every patient-facing output, and every claim Neeve makes. Built so we can cite our sources in marketing copy, the website, regulatory submissions, and (eventually) a paper of our own.

**Maintained by:** the Neeve team
**Last updated:** 2026-06-05
**Citation style:** Vancouver, MJA-modified format. Numbered references in citation order; bibliography at the end. Direct quotes carry a page reference (e.g. `[12, p. e43]`).

**Voice rule:** Our prose is plain English. The verbatim quotes from papers are where the clinical language lives. Two voices, one document — one written for a tired person to read, one written to satisfy a skeptical doctor. Both serve the same goal.

---

## 1. Why Neeve exists — the lived experience we're built for

People with chronic illness live in their bodies every day. A doctor gets fifteen minutes and whatever the patient can recall on the spot. That mismatch — not bad doctors, but too little information in too little time — is the gap Neeve is built to close. Most clinicians want to help; the structure doesn't give them enough to work with. The research below shows what that costs the patient.

Bokek-Cohen and Gabay interviewed hospital patients about what the literature calls "medical gaslighting" — what tends to happen when a clinician has nothing but a brief, unsupported account to go on. Symptoms get pinned on *"stress, obesity, poor nutrition, mental health, side effects of medications, or lack of exercise"*, leaving the patient *"to question their own bodily experiences, emotions, or judgment"* [1, p. 2]. The cost isn't abstract — the same paper documents delayed diagnosis, illness that worsens because nobody acted, lasting distress, and a slow erosion of trust in the whole system [1, p. 5].

It's structural, not personal. de Boer's study of how the Netherlands handled ME/CFS shows ill people get hit twice — once when their reports can't be backed by data, and again because medicine hasn't built the words for what they're going through. In her terms, they are *"particularly vulnerable to testimonial injustice because they are often attributed with certain characteristics that negatively affect their credibility, such as being emotionally unstable or irrational"*, and to hermeneutic injustice because *"the interpretative sources available to them … are lacking or are too impoverished in order for them to understand their experiences"* [2, p. 1337]. In plain terms: first the reports aren't treated as data, then the missing data is taken to mean the illness isn't real.

It lands hardest on women — and here the bias is built into medicine itself, not any one doctor. Laughey and colleagues describe a measurable gender pain gap, in which *"women feeling dismissed by clinicians, along with stigma and lack of knowledge, are key barriers to seeking health care"*, so care is delayed until *"severity can no longer be ignored, by which point body systems may already be negatively impacted"* [3, p. 2]. Brauer and colleagues asked women with endometriosis what they needed from their doctors, and the answer came in one sentence: *"Take me seriously or educate yourself, but don't dismiss it"* — being waved away left them with *"frustration, uncertainty about their future and a feeling of powerlessness"* [4, p. 11].

And there's a part nobody sees, because it never reaches a record. Estecha Querol and colleagues describe "non-visible disease" — the load chronic illness puts on a life that never makes it into a clinical chart: *"much of the struggle is hidden, linked to poverty, debt, isolation, emotional distress and mental ill health"*, with people *"not seeking professional help for mental health problems, in contrast to their help-seeking for physical symptoms"* [5, pp. 8, 10]. The illness is real. The chart is blank.

Put together, the picture is consistent — and it's about a system, not a profession. Chronically-ill people, and especially chronically-ill women, hold real, hard-won knowledge about their own bodies, and a fifteen-minute appointment with no long-term record is structurally bad at receiving it [1–5]. The result is delay, distrust, and a quiet withdrawal from the very systems meant to help. Neeve doesn't fix the fifteen minutes — it changes what walks into them. Instead of "I think it's been worse lately," the patient brings months of structured, validated data, and the clinician finally has something solid to work with. Not proof *against* the doctor — evidence that earns a serious conversation.

> **Evidence → product**
>
> **Evidence:** Australian POTS women wait a mean of 7.0 years for diagnosis; 64.6% had symptoms attributed to anxiety first [16, p. 159]. Lived experience is routinely dismissed at the bedside [1, p. 2].
> **Product rule:** Neeve produces a clinical-grade longitudinal record. It never tells the user how they are "doing", never displays a wellness score, never assigns a daily rating.
> **User-facing language:** *"Here's what your body did today."* Never *"your wellness score is 73"* or *"you're doing great"*.
> **Doctor-facing language:** *"Patient-generated longitudinal record over [N] days, grounded in validated symptom scales and continuous biometric data."* Never verdict labels.

---

## 2. How we measure — quick in-the-moment check-ins (EMA)

Neeve's check-ins use a method researchers call ecological momentary assessment (EMA) — short questions answered *in the moment*, in everyday life, instead of one long form once a fortnight in a clinic. Memory is unreliable; how you feel *right now* beats how you think you felt last week. The May et al chronic-pain EMA review [59] sets the overall shape — two anchored check-ins a day, event-based moments in between, the same scales every time, and a timestamp for both when a prompt fired and when it was answered — and three more papers tell us what to ask and how.

**Don't reuse clinic questionnaires as daily pings.** Hall and colleagues reviewed 234 EMA studies of mood and anxiety and found the field is all over the place — prompts from 1 to 64 a day, studies from 1 to 240 days, more than 4,600 different questions, and only 8.97% reporting that what they asked was both reliable and valid [6]. The lesson for us: you can't take a questionnaire built for once-a-fortnight clinic use, drop it in an app, and fire it at someone six times a day — *"administering this questionnaire multiple times per day would render its validity questionable"* [6, p. 2]. Even tiny wording shifts — "today" versus "in the last day" — change what people report, and people genuinely struggle to split their experience into windows as narrow as "the last hour". So we use "today" for a whole-day reflection and "right now" in the moment. (Across all 234 studies the most common scale was a simple 5-point one — and "right now" the most common framing.)

**One good question can do the work of a whole scale** — which matters, because we want the check-in short. Song and colleagues ran 5,020 EMA check-ins across 45 adults with anxiety and/or depression, four times a day for a month [7]. In 27 of 29 tests a single question carried real predictive weight — about 75% of what the full multi-question version managed, and once it beat it. Their conclusion is the green-light for our design: *"an equally valid single-item measure can be regarded as sufficiently reliable as a multiple-item measure… concurrently and predictively valid single items will undoubtedly prove useful in EMA studies where full scales may cause unnecessary participant burden and lower their response quality"* [7, pp. 1663, 1669]. Why it works: when the same person answers the same question day after day, they build their own frame of reference — the story is in *your* trend over time, not in comparing you to other people. One caution they flag: the question has to be narrow. "Sleep problems" is too broad to answer in one number — exactly why we avoid vague "how are you" or "general wellbeing" questions.

**It holds up in people who are unwell, not just research volunteers.** Tarca and colleagues ran this with 48 adults on dialysis — a single 0–10 mood scale ("Pick a number from 0 to 10: at the moment I feel," 0 = happy, 10 = sad) and a fatigue scale, five times a day for a week [8]. 73% answered, most calling the app *"easy, quick, and simple to use"* [8, p. 605], and a one-point change in mood tracked a 5.2-point change in fatigue (95% CI 4.55–5.93, p < 0.01) — proof these simple 0–10 scales catch real, meaningful change in unwell people. Two things we took straight from it: their users' main complaint was repetition — *"Same questions asked 10 different ways"* — so we keep our core to a few *distinct* questions, not near-duplicates; and the most-requested additions were anxiety and pain alongside mood and fatigue, so our fixed core covers those.

Putting all of this together, here's what Neeve's check-in items look like and why:

- **Plain language, narrow constructs.** Each item is about one specific thing — sad/down, anxious, fatigue, pain — not a composite "how is your wellbeing".
- **Anchored to "right now"** for the in-the-moment morning and event-based check-ins. Anchored to "since your last check-in" or "today" for the evening reflection. Never anchored to clinical recall windows like "in the last two weeks".
- **Same 0-10 numerical rating scale, every time, forever.** Verbal anchors at both ends. Wording does not change once we ship — that's how we keep months and years of data comparable per person.
- **Single items are the unit, not subscales of clinical questionnaires.** If we want PHQ-9 or GAD-7 data, we administer those instruments separately as periodic reflective check-ins (e.g. every two weeks) where their original validation actually holds.

> **Evidence → product**
>
> **Evidence:** Clinic questionnaires lose validity in repeated daily use [6, p. 2]; single items can do ~75% of the work of multi-item scales [7]; 73% adherence with single-item momentary scales in a chronic-illness population [8, p. 605].
> **Product rule:** Four core single items (pain, fatigue, fog, "anything off?") on a 0–10 NRS, wording locked at launch, anchored to "right now" for morning + evening + event-based check-ins.
> **User-facing language:** *"Right now: how is the pain? 0 (none) to 10 (worst you can think of)."* Same exact wording every prompt.
> **Doctor-facing language:** Within-person trajectories only. *"Pain 0–10 NRS — morning mean [X], evening mean [Y], 14-day trend [direction]; n = [N] anchored + [M] event entries."* Never population-normed.

---

## 3. How we adapt — just-in-time adaptive interventions (JITAI)

Section 2 was about how Neeve listens. This section is about when, and whether, Neeve says anything back. The principle is simple: speak only when it helps, and most of the time it doesn't. Researchers call the kind of system Neeve's engines are a "just-in-time adaptive intervention", or JITAI — a design that offers the right kind of support, in the right amount, at the right moment, and otherwise stays quiet. Nahum-Shani and colleagues, in the field's canonical paper, define a JITAI as a design that *"aims to provide the right type/amount of support, at the right time, by adapting to an individual's changing internal and contextual state"* [9]. Neeve's POTS engine, the ME/CFS engine, the migraine engine, and Alys herself are all JITAIs in this exact sense. Each one is built around the same six things every JITAI needs, and each one has to answer not just *what* to say but *whether to say anything at all* in this moment.

### 3.1 The six pieces of a JITAI, in Neeve's terms

Nahum-Shani's paper names six components every JITAI must specify [9]:

1. **The long-term goal.** What the whole thing is for. For Neeve: a credible, longitudinal record of a person's body that gives a clinician something solid to act on, and that helps the person manage their own life over months and years.
2. **The short-term steps that build toward the long-term goal.** For Neeve: catching a migraine prodrome inside the prodrome window. Logging a PEM crash within 48 hours of it starting. Surfacing an orthostatic heart-rate pattern the first time it shows up clearly.
3. **Decision points** — the specific moments when the system has to decide whether to act, which the paper calls *"points in time at which an intervention decision must be made"* [9, p. 448, Table 1]. For Neeve: the morning and evening check-in slots, the moment a flagged biometric pattern is detected (like a sustained HR jump), and any user-initiated "something is happening" log.
4. **Tailoring variables** — the things Neeve knows about *you specifically* that decide when and how (if at all) to step in, which the paper defines as *"information concerning the individual that is used for individualisation (i.e., to decide when and/or how to intervene)"* [9, p. 448]. For Neeve: yesterday's carry-forward values, ring-derived HRV/HR/SpO2 changes against the user's own baseline (not population baselines), local weather/AQI/pollen/UV from postcode, days since their last crash, and their stated condition profile.
5. **What we might actually do.** Deliberately narrow for Neeve: surface a quiet observation, append one context-aware probe to the next check-in, or — most importantly — do nothing. Nahum-Shani explicitly argues for keeping a "do nothing" option, used *"in situations in which the person is unreceptive, as well as in conditions in which support is not needed (e.g., because the person is doing well)"* [9, p. 455].
6. **Decision rules** — the if-then logic that connects the tailoring variables to what we actually do. Example for Neeve: *if* resting heart rate has shifted by more than 10 bpm against a 7-day baseline, *and* the user hasn't already logged a possible cause, *and* it's been more than 24 hours since the last Alys observation, *then* attach a single context probe to the next check-in. Otherwise, do nothing. The paper requires that rules specify *"which intervention option to offer, for whom, and when (i.e., under which experiences/contexts)"* [9, p. 448, Table 1].

### 3.2 Receptivity is a gate, not an afterthought

Before saying anything, Neeve asks one question: is this person actually in a place to hear from us right now? That readiness is what separates a JITAI from a machine that just fires notifications. Researchers call it receptivity, which Nahum-Shani defines as *"the individual's transient ability and/or willingness to receive, process, and utilise just-in-time support"* [9, p. 450]. The paper is blunt about what happens when you ignore it: *"providing support when the person is not receptive will not be beneficial and may even have negative implications on engagement with the intervention and intervention fatigue"* [9, p. 450].

For a chronic-illness audience this matters more than for, say, a habit-tracker. A probe that fires during a crash, during driving, in the middle of a difficult conversation, or while the user is asleep doesn't just go unanswered — it actively confirms the feeling of being surveilled by something that doesn't understand. Every Neeve engine treats receptivity as a gate on every decision. If the ring shows the user is asleep, if they've explicitly flagged a low-energy day, or if a probe in the last few hours was dismissed without response, the default answer is "do nothing".

### 3.3 The cost of getting timing wrong

Get the timing wrong often enough and people quietly stop using the app altogether — which is exactly the failure Neeve is built to avoid. Nahum-Shani draws a line between two states. There's *intervention engagement* — *"a state of motivational commitment or investment in the client role"* — and *intervention fatigue* — *"a state of emotional or cognitive weariness associated with intervention engagement"* [9, p. 450]. They point to what's called the "law of attrition" in mobile health, the well-documented pattern where people *"use mHealth resources only a few times before abandoning them"* [9, p. 450]. This is why Neeve doesn't gamify, doesn't escalate, doesn't try to win back attention. Every Alys observation, every appended probe, every engine-triggered prompt is a withdrawal from a finite engagement budget. When we're not sure, the answer is silence.

### 3.4 What the field hasn't solved — and what Neeve has to do differently

Even the researchers building these systems mostly haven't got the hard part right yet — which tells us where Neeve has to be careful. A 2025 systematic review of JITAIs aimed at mental health found only five distinct JITAIs across nine published papers [10]. Most named the six components on paper, but the authors found that *"not all essential elements within the core components were incorporated (e.g., receptivity and adaptivity as part of the tailoring variables) and there is uncertainty regarding whether the interventions were delivered 'in-time' or whether crucial moments were missed since the decision points were not theory-based but based on pragmatic choices"* [10]. Only one of the five reviewed JITAIs modelled both vulnerability *and* receptivity as tailoring variables [10]. The implication for Neeve: most actual fielded JITAIs treat readiness-to-hear as an afterthought, and treat the personalisation as one-size-fits-all instead of evolving with the user. Neeve has to do both — receptivity gates every decision, and the baselines update per-user, not per-cohort.

The picture in consumer apps is worse. Teepe and colleagues reviewed the 28 most popular depression apps on the App Store and Google Play and concluded *"the 28 most popular or recommended apps that address depression cannot be considered JITAIs"* [11]. 71% used only self-reports, and only as score displays, not to make decisions. Only 18% used any passive sensor data. And critically, *"we did not find any measurement that may serve to tailor to the state of receptivity"* [11]. The market gap Neeve fills isn't "another mood tracker". It's a properly specified JITAI for chronic illness, where the ring acts as a passive tailoring signal, vulnerability and receptivity are both modelled, and the default state is silence.

### 3.5 What this means for the engines and for Alys

Concretely, every Neeve engine ships with its six components named explicitly — in code and in documentation. Alys isn't a chatbot. She's the human-facing surface of decision rules that have resolved to "surface an observation" or "attach one probe". When the engine has low confidence — only a few days of baseline, missing ring data, contradictory signals — it attaches a confidence label rather than suppressing the observation entirely. That preserves our "early-symptom user with five days of data" case while keeping the safety language we use everywhere else. When confidence is high but the moment is wrong, the engine stays silent and waits for the next decision point. This is the architectural commitment that lets us claim, defensibly and in regulator-safe wording, that Neeve identifies possible patterns at the right moment — and, just as importantly, knows when not to interrupt.

> **Evidence → product**
>
> **Evidence:** A JITAI requires 6 named components including an explicit "do nothing" option and receptivity gating [9, p. 448, 450, 455]; 0 of the 28 most popular depression apps modelled receptivity [11].
> **Product rule:** Every Neeve engine specifies the six JITAI components in code. Receptivity gates every decision. The default action is silence. Engagement budget is finite — we never escalate.
> **User-facing language:** Alys never reminds, nudges, or escalates. *"Want to share how the day went?"* Never *"you forgot to check in!"* or streak counters.
> **Doctor-facing language:** *"Engine decisions over [N] days: [X] observations surfaced, [Y] suppressed for low receptivity. Six-component JITAI specification in appendix."*

---

---

## 4. The silent witness — biosignals from the Neeve Ring

*What the ring measures, what those signals mean physiologically, what the peer-reviewed literature on wearable PPG accuracy supports as defensible claims.*

Neeve has two witnesses. The check-in is what the user says. The ring is what the body says while the user gets on with their day. Both feed the engines in §5, and both end up in the doctor PDF in §7. This section grounds the ring half, and it does so cautiously on purpose. The ring is the silent witness, never the verdict — and a witness is only as believable as the account of what they actually saw. Every claim Neeve makes from ring data has to survive a careful clinician asking, fairly, "how do you know that?"

The structure here is a translation between two ceilings. The general PPG literature sets a floor — what any reflective finger sensor can defensibly do, in any device. The Neeve Ring hardware sets a ceiling — what this specific ring, at its firmware-default sample rates and a 10-minute autonomous monitor cadence, actually delivers. §4.3 is the per-metric table that reconciles the two: what we claim, what we don't, and what the doctor PDF footer says.

### 4.1 What reflective finger PPG can defensibly do

First, the basic idea. Photoplethysmography (PPG) is a way of measuring the tiny changes in blood volume just under the skin using light. A small light shines into the tissue and a sensor measures how much bounces back; because blood absorbs more light when the heart pushes a pulse through, the returning light traces out a waveform, and from that waveform you can work out heart rate, blood-oxygen level, breathing rate, and a few related things. The Neeve Ring uses the "reflective" version, where the light source and the sensor sit on the same side of the skin. The hospital fingertip clip is the "transmissive" version — it shines light all the way through the finger. Both work; the reflective kind is just harder to keep a clean reading from.

The single most relevant study for a ring on the finger is Longmore et al. (2019), who put eight matched reflective PPG sensors at different spots on the body and compared heart rate, SpO₂, and breathing rate against a commercial through-the-finger pulse oximeter and a chest-band breathing shirt. The takeaway lands in their favour: they found *"the finger to be the best location for measurement of all three parameters at rest"* [47, p. 1]. At rest, finger reflective PPG produced median heart-rate error of *"1.5 (±16%) using both the red and IR channels combined"* [47, p. 9] and SpO₂ median error of *"2.1% ± 1.2%"* [47, p. 11] against the commercial reference. The same study is honest about what breaks: walking degraded finger SpO₂ to a *"median error larger than 19%"* at most sites and substantially widened the finger's own standard deviation, attributable to *"movement artefacts introduced into the waveform from each step"* [47, p. 13]. The lesson is simple — the finger is the right place to read from, and movement is the main enemy.

Heart rate from wrist and finger wearables more broadly holds up well against the gold-standard ECG, with the catch that movement throws it off. Bent et al. (2020) compared six wrist-worn devices to a clinical-grade ECG across rest and activity in 53 participants, and found that *"different wearables are all reasonably accurate at resting and prolonged elevated heart rate, but that differences exist between devices in responding to changes in activity"* [48, p. 1]. Resting heart rate from consumer wearables had a mean absolute error of *"7.2 ± 5.4 bpm"*, rising during activity to *"10.2 ± 7.5 bpm"* — an absolute error during activity approximately *"30% higher than during rest"* [48, p. 3]. The same paper checked whether skin tone on its own made heart-rate accuracy worse and concluded *"we did not find statistically significant differences in HR or HRV accuracy across skin tones"* [48, p. 6], though it explicitly notes prior work has shown *"inaccurate PPG HR measurements occur up to 15% more frequently in dark skin as compared to light skin"* due to higher melanin absorption [48, p. 1]. The effect is real; pinning down its size needs more diverse groups of people than most validation studies manage to recruit.

Where skin tone matters most is blood-oxygen readings, not heart rate — and the consequences are serious. Sjoding et al. (2020), the landmark NEJM analysis of 10,789 paired pulse-oximetry / arterial-blood-gas measurements, found that *"Black patients had nearly three times the frequency of occult hypoxemia that was not detected by pulse oximetry as White patients"* [49]. Occult hypoxaemia here means truly low blood oxygen (below 88%) that the finger reading misses by showing a falsely reassuring 92% to 96%; it occurred in 11.7% of Black patients versus 3.6% of White patients in the Michigan cohort, and 17.0% versus 6.2% in the multicentre cohort [49]. In the authors' own words: *"reliance on pulse oximetry to triage patients and adjust supplemental oxygen levels may place Black patients at increased risk for hypoxemia"* [49]. That was about clinical-grade through-the-finger oximeters. A consumer reflective ring will at minimum inherit this bias and probably worsen it. So the Neeve Ring shows SpO₂ only as a within-person trend, with an explicit skin-tone caveat in the doctor PDF footer, and never as an absolute number the user is asked to act on.

Heart-rate variability (HRV) — the small beat-to-beat timing differences that reflect how the nervous system is balancing itself — is trustworthy from a ring for some measures and not others. The rule of thumb: the simple time-based measure is fine as a within-person trend, while the more processed "frequency" measures are not. Cao et al. (2022) compared the Oura Ring (finger reflective PPG, the same broad design as the Neeve Ring) against a medical-grade chest ECG across overnight sleep in 35 healthy adults, and reported that *"the Oura Ring could accurately measure nocturnal HR and RMSSD in both the 5-minute and average-per-night tests"* [50, p. 2], with HR Pearson correlation of 0.993 and mean bias of −0.44 bpm, and RMSSD correlation of 0.915 with mean bias of −14.97 ms over 5-minute windows [50, p. 6]. Averaged per night, agreement was high for HR (r = 0.99968) and RMSSD (r = 0.962), with narrower confidence intervals than the 5-minute analysis [50, p. 10]. But the same study found *"the LF and LF:HF ratio of the ring had high error rates in both tests"* [50, p. 2], with LF:HF Pearson correlation of only 0.355 over 5-minute windows. The clean reading: ring HRV is defensible as RMSSD trended within-person over nights or longer windows; absolute HRV is not defensible; and frequency-domain HRV from a consumer ring is not defensible at all.

Breathing rate can be pulled out of a PPG signal too, but only roughly. Charlton et al. (2016), in the largest systematic comparison of breathing-rate algorithms (314 algorithms tested against a nasal-oral pressure reference), reported the best PPG-based algorithm achieved *"95% LOAs of −5.1 to 7.2 bpm and a bias of 1.0 bpm when using PPG"* [51, p. 610] — meaning a derived breathing rate from a clean PPG signal is good to roughly ±6 breaths per minute on a single window. The same paper notes *"Algorithms performed better when using ECG than PPG"* [51, p. 610]. Put plainly: breathing rate from the Neeve Ring is a useful trend to watch, not a substitute for actually counting breaths. Longmore et al. (2019) found that at the finger specifically, breathing rate at rest had median error of *"0.55 rpm (±13)"* in red and *"0.11 rpm (±13)"* in infrared, but walking degraded this to *"6.5 rpm"* in red [47, p. 12]. The signal is there when the wearer is still and gone when they move.

Blood pressure from PPG is the one area where products overclaim most and the evidence is most damning, so Neeve simply refuses to show it. Mukkamala et al. (2022), in the most authoritative recent review, conclude that despite years of effort *"no device or measurement principle has been widely accepted"* [52, p. 203] and that for the calibrated finger-PPG methods most consumer wearables would use, *"there is no compelling proof in the public domain indicating that they can accurately track intraindividual BP variations"* [52, p. 222]. The Neeve Ring's PPG-derived blood-pressure estimate exposed by the YC SDK falls squarely in this category. So the Neeve Ring never displays ring-derived BP to the user as a BP number, and the doctor PDF sources BP exclusively from manually entered cuff readings (see §7).

### 4.2 The Neeve Ring hardware

At the silicon level, the Neeve Ring is built on the AC6323/RF03 chipset (Jieli AC69x family) running YC-Tech firmware. Its reflective PPG front-end uses red, infrared, and green LEDs, and it sends its data out over Bluetooth via the YC SDK. The metrics confirmed working on this hardware — verified both through the SDK `isSupport*` capability flags and through watching what the firmware actually does — are: heart rate, SpO₂, HRV (validated against paired user comparisons), respiration rate, step and activity, sleep stage (vendor-derived), and a PPG-PWV-derived blood pressure estimate that depends on calibration.

Some metrics the SDK advertises but the hardware can't really deliver. Skin temperature returns statusCode = 0 but the firmware ignores the underlying request; blood fat and blood glucose are marketed by the OEM but are non-functional on the AC6323 base. The Neeve app silently disregards all of these, and none of them ever reach the doctor PDF.

A note on timing, because it shapes what the engines can ask of the ring. The sample rates for the PPG, ECG-equivalent, accelerometer, and temperature streams can technically be changed via `setDeviceSensorSamplingRate`, but that is an undocumented binary-SDK call we have never invoked, so the Neeve Ring just runs at firmware defaults. Separately, how often the ring takes a reading on its own is controlled by `setDeviceHealthMonitoringMode(interval:)`, with a documented default of 60 minutes; Neeve currently runs it at 10 minutes (down from an earlier 2 minutes, which drained the battery without making the signal any better). What the 10-minute cadence means in practice is that the Neeve Ring is not a continuous monitor like a holter. It is a discrete sampler — it takes a snapshot every so often. Any engine that needs finer detail — the POTS active-stand replication in §5.1 in particular — has to fire off an on-demand burst rather than lean on the background stream.

To be clear about the form factor: it is reflective finger PPG. There is no ECG electrode. There is no working skin-temperature sensor. There is no medical-grade pulse-transit-time pathway. The Neeve Ring is a consumer-grade reflective PPG ring with an accelerometer, on a Tier 1 chipset whose limits we manage in software per the chipset-tier framework. That is the ceiling on what §4.3 is allowed to claim.

### 4.3 Per-metric defensibility table

The table below is the working rule set. Every ring-derived value that shows up anywhere in Neeve — in the Today view, as an engine input, in the doctor PDF — has to match one of these rows.

| Metric | What Neeve claims | What Neeve does NOT claim | Doctor PDF provenance footer |
|---|---|---|---|
| **Heart rate (resting)** | Within-person trends and absolute values at rest, with ±5–10 bpm accuracy versus ECG per [48, p. 3]. Used by every engine. | Beat-to-beat precision; medical-device-grade alarms. | *"Heart rate derived from reflective finger PPG (Neeve Ring). Resting accuracy ±5–10 bpm vs ECG reference [48]. Not a diagnostic device."* |
| **Heart rate (during activity)** | Trends only. Flagged with a confidence label when motion artefact is likely. | Accuracy during walking, exercise, or repetitive motion. | *"Activity-period HR shown for context; absolute error ~30% higher than at rest [48, p. 3]."* |
| **HRV (RMSSD, nightly average)** | Within-person trends over nights. Nightly-mean RMSSD validated against ECG in equivalent finger-PPG ring hardware [50, p. 10]. Used by ME/CFS and migraine engines as a trend input. | Absolute HRV values; cross-person comparison; clinical HRV ranges. | *"Nocturnal RMSSD from reflective finger PPG. Nightly-mean Pearson r = 0.96 vs ECG in matched ring hardware [50]. Shown as within-person trend only."* |
| **HRV (frequency-domain: LF, HF, LF:HF)** | Nothing. Not surfaced to the user or the doctor PDF. | Anything at all. | Not included. *"Frequency-domain HRV from consumer ring PPG is not defensible [50, p. 2] and is excluded."* |
| **SpO₂** | Within-person trends, with explicit skin-tone caveat. Used by ME/CFS engine as a contextual variable for nocturnal desaturation patterns. | Absolute SpO₂; clinical decisions; any absolute threshold. | *"SpO₂ from reflective finger PPG. Trend only. Pulse oximetry over-reads true arterial saturation in patients with darker skin pigmentation [49]; absolute values are not reliable and clinical decisions should rely on arterial blood gas where indicated."* |
| **Respiration rate** | Within-person nightly trends at rest. Used by migraine and ME/CFS engines as a sleep-architecture input. | Absolute breath counts; awake/walking respiration. | *"Respiration rate derived from PPG modulation. Best-case agreement ±6 bpm vs reference [51, p. 610]. Resting trend only."* |
| **Step count, activity intensity** | Standard accelerometer outputs. Used by ME/CFS pacing engine and POTS posture detection. Steps are NOT shown as a hero metric per the design brief. | Calorie estimates; "fitness" framing. | *"Step and activity counts from on-ring accelerometer. Standard consumer-grade accuracy."* |
| **Sleep stages (vendor-derived REM/light/deep)** | Stage proportions as a trend, with low-defensibility flag. Used by migraine engine as one input among several for sleep-architecture disruption. | Specific stage timing; sleep-disorder diagnosis. | *"Sleep stages estimated by the device manufacturer's proprietary algorithm. Consumer-grade sleep staging is moderately accurate for sleep/wake but unreliable for specific stage classification; shown as trend only."* |
| **Blood pressure (PPG-PWV-derived)** | Nothing visible to the user as a BP number. Internal data only, never displayed. | Any BP claim, ever. | Not included from ring. BP in the doctor PDF is sourced exclusively from manually entered cuff readings per the cuff calibration protocol. *"Ring-derived BP is not displayed; cuffless PPG BP has no compelling evidence of accurate intraindividual tracking [52, p. 222]."* |
| **Skin temperature, blood fat, blood glucose** | Nothing. SDK exposes them; the hardware does not support them. | Anything. | Not included. *"Not measured by this device."* |

### 4.4 What the engines actually use

Each engine in §5 draws on a specific slice of the table above. The constraints below are the input contract — what each engine is allowed to lean on.

**POTS engine (§5.1).** Uses HR (well-grounded) and accelerometer-derived posture transitions (standard). The change in heart rate on standing that the engine watches for — a rise of 30 bpm or more, held over 10 minutes after sitting up or standing from lying down — sits comfortably inside the ±5–10 bpm resting accuracy from [48, p. 3], so there's margin to spare. This is the engine with the cleanest defensibility profile. SpO₂ is not used as a POTS input.

**ME/CFS engine (§5.2).** Uses RMSSD nightly mean (trend only, within-person, per [50, p. 10]), step count and activity intensity (standard accelerometer), and resting HR trend. PEM detection — spotting the delayed crash after exertion — rests on the combination of a step-count drop, a resting-HR elevation, and a nightly-RMSSD shift measured against the user's own baseline, with each input flagged for confidence. The engine does not use frequency-domain HRV, does not use SpO₂ as a verdict, and does not use sleep stages as a primary signal.

**Migraine engine (§5.3).** Uses RMSSD nightly trend, respiration-rate nightly trend, and vendor sleep-stage proportions, all flagged as trend-only inputs. Prodrome detection — catching the early warning hours before a migraine — looks for a divergence from the user's own 14-day rolling baseline; the engine never asserts a sleep stage from a single night. Sleep-stage data carries the lowest-defensibility flag of any input the engine uses.

**Endometriosis engine (§5.4) and fibromyalgia / anxiety-depression overlay (§5.5).** Here the ring inputs are minimal and contextual: resting HR for autonomic baseline (well-grounded), nightly RMSSD trend (well-grounded within-person), step count for activity context. These engines lean predominantly on the EMA check-in side; the ring is supportive context, not a primary signal.

One rule runs across all the engines. Where supporting a claim would mean stacking several shaky inputs on top of one another, the engine reports those inputs separately instead of fusing them into one over-confident composite. The user sees observations like *"steps down, resting HR up, RMSSD lower than your usual nights"* as three separate facts, not a single "PEM detected" verdict.

### 4.5 Honest limits

Five limits worth naming up front, so the doctor PDF never has to surface them the hard way, in a failure.

**Off-finger artefacts.** A reflective PPG reading is only trustworthy when the optical window is in good contact with skin. The ring works out whether it's being worn from accelerometer activity and PPG signal quality, not from a dedicated wear-detection sensor, so a loose or off-finger ring can produce noise that looks superficially like a real physiological signal. The engines therefore run a signal-quality check on every burst, and missing data is shown as missing — never guessed or filled in.

**Motion.** Per Longmore et al. (2019), walking widens finger SpO₂ error to >19% [47, p. 13]; per Bent et al. (2020), walking widens HR error by ~30% [48, p. 3]. So Neeve never reports SpO₂ during user-flagged activity, and HR during activity is shown with a confidence label.

**Skin tone.** The pulse-oximetry skin-tone bias [49] is the single biggest reason ring-derived SpO₂ is presented as a within-person trend with explicit clinical caveats, not as an absolute number. We will revisit this once the device cohort is large enough to characterise per-Fitzpatrick category, and we'll be honest about the limit in the meantime.

**Sample-rate constraints.** Because we run at firmware defaults rather than calling `setDeviceSensorSamplingRate`, the effective PPG sampling rate for HRV is bounded by whatever the firmware picks, not by what the SDK could theoretically allow. This is a known constraint we accept as the price of stable, reliable behaviour on a Tier 1 chipset.

**Autonomous cadence (10 minutes).** On its own, the ring takes a reading every 10 minutes, not a continuous stream. POTS detection therefore relies on an on-demand active-stand burst triggered from the app, not on the background stream. The 10-minute cadence is fine for nightly trends, daily-mean inputs, and slow-moving variables; it is not fine for catching brief events shorter than about 10 minutes.

**The BP calibration gap.** As above, the ring's PPG-PWV BP estimate is never shown to the user as BP. Until the consumer-PPG cuffless BP field produces *"compelling proof in the public domain"* [52, p. 222] that it can track a person's own blood-pressure changes, BP in Neeve comes from manually entered cuff readings, calibrated and time-stamped per the cuff protocol.

> **Evidence → product (Biosignals summary)**
>
> **Evidence:** Finger reflective PPG is the most accurate single anatomical site for HR, SpO₂, and resting respiration rate [47, p. 1]; consumer-wearable HR is accurate to ±5–10 bpm at rest and ~30% worse during activity [48, p. 3]; pulse oximetry systematically over-reads true SpO₂ in patients with darker skin [49]; nightly-mean RMSSD from finger-PPG ring hardware agrees with ECG at r ≈ 0.96, but frequency-domain HRV and absolute values do not [50, p. 2, p. 10]; respiratory rate from PPG is good to ±6 bpm at rest [51, p. 610]; cuffless PPG-derived BP has no public evidence of accurate intraindividual tracking [52, p. 222].
> **Product rule:** The ring is allowed to claim within-person trends in HR, RMSSD (nightly), SpO₂ (trend with caveat), respiration (resting), steps, and sleep stages (trend with low-defensibility flag). The ring is not allowed to display absolute SpO₂ as a clinical value, frequency-domain HRV, or any blood pressure. Doctor PDF sources BP exclusively from cuff readings.
> **User-facing language:** *"Your ring noticed your nights have been less restful than usual this week."* Never *"your HRV is low"* or *"your SpO₂ dropped to 92%"*.
> **Doctor-facing language:** *"Ring metrics derived from reflective finger PPG (Neeve Ring; Kingsmart R11M form factor). Heart rate at rest: ±5–10 bpm vs ECG [48]. Nocturnal RMSSD: within-person trend, Pearson r ≈ 0.96 vs ECG in matched finger-ring hardware [50]. SpO₂: trend only — pulse oximetry over-reads true SaO₂ in patients with darker skin pigmentation [49]; clinical decisions should not rely on these values. Respiration rate: derived signal, ±6 bpm at rest [51]. Frequency-domain HRV: excluded. Blood pressure: sourced from cuff readings only, not from ring."*

---

---

## 5. Per-condition pattern engines

**Important framing:** Neeve is for chronic illness broadly — POTS, ME/CFS, Long COVID, migraine, endometriosis, fibromyalgia, and the anxiety/depression overlay that runs alongside all of them. POTS is detailed first as §5.1 because its diagnostic criterion is concrete and measurable from the ring, and because it is the most directly ground-truthable engine. **That does NOT make POTS the lead condition.** Every condition below gets the same depth of evidence, the same Evidence-to-product box, the same engine spec. The brand, the marketing, the app's audience-facing surface should never lead with POTS at the expense of the others — the typical Neeve user has 2-3+ of these conditions at once, not just one.

### 5.0 The multimorbidity reality — why single-condition framing is wrong

Most people with chronic illness aren't dealing with one thing. They're carrying several at once — often overlapping, often diagnosed years apart, with each new specialist starting again from scratch. That isn't anyone's fault; it's how a system built around one-organ-at-a-time appointments handles a body that doesn't read the textbook. The numbers bear it out. The Australian POTS registry found participants were currently seeing a mean of 7.5 specialists each [16, p. 159]. Having had Long COVID raises the chance of going on to develop ME/CFS nearly fivefold — a 4.93× hazard ratio [20, p. 1085]. Endometriosis sits in a cluster with migraine, IBS, fibromyalgia and autonomic dysfunction (the body's automatic "background" systems — heart rate, blood pressure, digestion — going haywire). Fibromyalgia overlaps measurably with POTS through the same shared autonomic-dysfunction markers. A migraine's warning signs (fatigue, fog, neck stiffness) are, on their own, indistinguishable from an ordinary bad ME/CFS day. Anxiety and depression run alongside every one of these conditions — and standard scales like the PHQ-9 over-diagnose depression in this population because they score positive on physical items (fatigue, sleep change, appetite) that belong to the underlying illness, not to a separate mood disorder. The orthostatic-intolerance picture is itself a trio of overlapping problems: Yao and colleagues, reviewing 100 young POTS patients, note that the link between POTS, joint hypermobility disorders, and mast cell activation syndrome (an immune system that misfires too readily) is *"now firmly established"* — hypermobility present in 13–34% and MCAS in 2–87% depending on which criteria are applied — and warn that over-strict criteria *"misses opportunities for potential therapeutic strategies"* [61]. (This is the same hypermobility cluster the ADHD overlay sits inside, §5.7 [54].)

What this means for Neeve: the engines are modular, but the user is one person carrying all of them. The Today screen surfaces patterns from whichever engines have signal. The doctor PDF renders multiple conditions side by side, so a clinician sees the whole person rather than the one slice their specialty covers. The check-in core (pain, fatigue, fog, "anything off?") is condition-AGNOSTIC and asked of every user every day; condition-specific probes are an ADDITIONAL layer that engines attach. The dignity layer (§6) is condition-agnostic too — the way Alys speaks, and the way the app shows confidence labels, does not change between a POTS user and a fibromyalgia user. The structural commitment is simple: single-condition framing is wrong, and we never present the product or its output as if it were single-condition.

### 5.1 POTS — postural orthostatic tachycardia syndrome

POTS is the first per-condition pattern engine Neeve will ship. The reason is practical, not a statement about importance: POTS has a heart-rate pattern you can actually measure when someone stands up, it has a properly validated symptom questionnaire, and it's a condition people wait a long time to have recognised. Neeve does not diagnose POTS. The engine spots wearable-derived pattern candidates that *may* line up with the published criteria, sets them next to what the person has told us about their symptoms and daily function, attaches a confidence label, and surfaces them for the patient and — with their consent — the treating clinician who's trying to help.

#### 5.1.1 What the diagnosis actually requires

To know what to look for, start with what doctors use to make the call. The 2015 Heart Rhythm Society (HRS) Expert Consensus Statement is the canonical source for POTS criteria. It describes POTS as a clinical syndrome with two pieces: a set of orthostatic symptoms — light-headedness, palpitations, tremor, weakness, blurred vision, exercise intolerance, fatigue — plus a sustained heart-rate rise when the person stands up, with blood pressure *not* dropping in the way it would for orthostatic hypotension (a faint-on-standing pattern that is a different problem) [12].

The threshold is specific. The HRS statement reads: *"(2) an increase in heart rate of ≥30 beats per minute (bpm) when moving from a recumbent to a standing position held for more than 30 seconds (or ≥40 bpm in individuals 12 to 19 years of age); and (3) the absence of orthostatic hypotension (>20 mm Hg drop in systolic blood pressure)"* [12, p. e43]. From this, the engine takes:

- **Adults (20 and older):** a sustained heart-rate rise of **30 bpm or more** when standing [12, p. e42].
- **Adolescents (12-19):** a sustained heart-rate rise of **40 bpm or more** [12, p. e42]. If the user's profile shows their age in this range, the engine swaps the threshold.
- **Standing heart rate is "often 120 bpm or more" in POTS** [12, p. e42]. The engine uses this as a corroborating signal, not a required one — plenty of real POTS patients have lower absolute standing rates.
- **How long the rise has to be present:** the HRS minimum is *"more than 30 seconds"* [12, p. e43], but accepted clinical protocols extend observation to 10 minutes (see §5.1.2). The Australian POTS registry diagnoses also required *"a sustained heart rate increase of at least 30 beats per minute … during a 10-minute active standing test or head-up tilt table test"* [16, p. 159].
- **How long the symptoms have to have been going on:** at least 3 months (HRS implicitly; the Australian registry made it explicit) [16, p. 159]. The engine will not surface a "POTS pattern" label until there are at least 3 months of qualifying events. Before then, the engine describes individual events only.

**What the engine must not flag as POTS.** Being careful about what *isn't* POTS is as important as spotting what might be — getting this wrong is how a tool loses a clinician's trust. The HRS consensus is specific about disqualifiers:

- **Orthostatic hypotension** — a drop in systolic blood pressure of more than 20 mmHg (or diastolic more than 10 mmHg) on standing rules out POTS [12, p. e43]. The R11M can't measure beat-to-beat blood pressure reliably, so the engine can't positively rule orthostatic hypotension in or out. The doctor PDF flags the candidate accordingly: "POTS-pattern (BP not measured by ring — orthostatic hypotension cannot be excluded; clinician verification required)".
- **Other reversible causes:** dehydration, deconditioning, recent heat or alcohol, anaemia, hyperthyroidism, adrenal insufficiency, and certain medications that block the norepinephrine reuptake transporter (which the HRS warns *"should not be administered"* in POTS) [12, p. e44]. The engine raises these as differentials in the doctor PDF, never as ruled-out.
- **Inappropriate sinus tachycardia (IST)** — a fast heart rate that's there even at rest: a resting heart rate above 100 bpm with a 24-hour mean above 90 bpm, *"not due to primary causes"* [12, p. e45]. The engine distinguishes IST from POTS by asking whether the fast heart rate only shows up on standing (POTS) or is persistent at rest (IST).

#### 5.1.2 The active stand test — what we replicate in software

The clinic version of this test is simple to describe: lie down quietly, then stand up, and watch what the heart rate does over the next ten minutes. Neeve approximates that active stand test in software, using ring HR plus motion-derived posture and step changes. The reference protocol from the Malmö group, used to validate the MAPS score below, reads:

> *"Before initiating the active stand test, each participant had to lie quietly in a supine position for 10 min, after which baseline supine blood pressure and HR were measured. The subject was then asked to perform active standing for 10 min. Blood pressure was measured at 1, 3, 5 and 10 min …"* [14, pp. 92–93]

The case report from Breslin and colleagues describes the same pattern in practice: a Finometer (a continuous beat-to-beat blood-pressure monitor) recorded a heart-rate rise from about 90 bpm to over 120 bpm sustained for more than 3 minutes on standing, with the patient's symptoms reproduced. They describe the POTS signature as *"a sustained tachycardia >30bpm without significant blood pressure change within the first 10 minutes of moving from supine to upright"* [13, p. 2].

**How we do it without asking the user to lie down on cue.** A tired person isn't going to run a lab protocol on themselves twice a day. So the engine waits for ordinary "stand events" to happen on their own rather than scheduling a test:

1. The engine finds a **resting baseline** during a calm window of at least 5 minutes (relaxed from the 10-minute protocol so it works in real life; the looser baseline is flagged as lower confidence).
2. A **posture transition** is detected from accelerometer step and orientation changes.
3. **Standing heart rate** is sampled at the equivalents of 1, 3, 5 and 10 minutes after standing, requiring the user to stay roughly stationary (steps below a threshold) so the rise reflects standing up, not walking.
4. The event becomes a **POTS-pattern candidate** if the standing peak exceeds the baseline by 30 bpm or more (40 bpm for adolescents) and the rise is sustained for at least 3 minutes — both Breslin's observed duration [13, p. 2] and the floor at which the Malmö 3-minute orthostatic-HR sample becomes the primary correlate of MAPS score [14, p. 95].

The label in the app and the doctor PDF is **"POTS-pattern candidate"**, never "POTS detected" or "POTS likely". The literature is honest that the active stand test has *"relatively low test-retest reliability"* [13, p. 2] — meaning the same person can get a different result on a different day — so a single event is never enough. The engine requires multiple events across separate days before raising the pattern to the Today screen or the doctor PDF.

#### 5.1.3 The Malmö POTS Symptom Score — the validated scale we use

There is, so far, exactly one self-report questionnaire built and validated specifically to measure how heavy POTS symptoms are: the Malmö POTS Symptom Score (MAPS) [14]. Neeve uses it for two things: a baseline at onboarding for users who tell us they have or suspect POTS, and a symptom-burden trend that goes into the doctor PDF.

**What's in it.** *"12 items, each a visual analogue scale (VAS) from 0 (no symptoms) to 10 (very pronounced symptoms)"*, with a total range of 0-120, scored over the previous 7 days [14, p. 93]. The 12 items split into 5 cardiac (palpitations, dizziness, presyncope, dyspnoea, chest pain) and 7 non-cardiac (gastrointestinal symptoms, insomnia, concentration difficulties, headache, myalgia, nausea, fatigue).

**The threshold that matters.** A total MAPS score of **42 or more** separates POTS from healthy controls with sensitivity 96.8% (95% CI 88.8-99.6) and specificity 98.0% (95% CI 89.4-99.9). Positive predictive value 98.4%, negative predictive value 96.1%, positive likelihood ratio 48.8 [14, p. 95, Fig. 3]. POTS patients averaged a total of *"78 ± 20"* in the validation study, compared to *"14 ± 12"* in healthy controls (p<0.001) [14, p. 93]. The three highest-scoring items in POTS patients were palpitations (7.7 ± 1.7), fatigue (7.6 ± 2.5) and concentration difficulties (7.2 ± 2.1) [14, p. 93] — these are the symptoms our POTS-mode check-in surfaces by default.

**MAPS lines up with the heart-rate evidence.** The questionnaire and the ring aren't measuring two unrelated things — they track together. At 3 minutes of standing, the MAPS total had a Pearson r of 0.658 (R² = 0.433, p<0.001) with orthostatic heart rate [14, p. 96, Fig. 4]. This is the empirical bridge that lets Neeve put ring-derived stand events and the MAPS trend on the same trajectory in the doctor PDF — they're measuring related sides of the same condition.

**How we use it.** Full MAPS at onboarding for users in POTS-mode. Re-administered on a clinician-set cadence (default: every 4 weeks). The score is never displayed as a verdict. It's shown as a trajectory — "your MAPS total has been trending down over the last 8 weeks" — with the 42 cut-off marked as a reference line, the way clinical instruments are usually read. It feeds the doctor PDF as a numbered trend alongside the POTS-event count.

#### 5.1.4 What wearables can actually do for POTS

Here's the honest boundary: the evidence backs a wrist-worn heart-rate monitor as a genuine day-to-day management aid for POTS, but it does *not* back diagnosing the condition by algorithm. Gabriel and colleagues ran a qualitative study of an Apple Watch app for POTS (8 participants, mean age 40.25 ± 15.1, 62.5% women), and identified five themes including *"Technology-enhanced symptom management"* and *"Empowerment through real-time feedback"* [15, pp. 161-163]. Participants said the app *"could offload the task of active heart rate monitoring, reducing the cognitive burden of self-management"* [15, p. 163] — which is exactly the cognitive-load problem Neeve is built for.

The same paper is explicit about what real-time heart-rate monitoring is *for* in POTS: pacing — staying inside your limits — not diagnosis. *"Activity 'pacing' is an effective method used to manage POTS … Pacing involves maintaining activity levels within the parameters of the condition. This approach enables patients to carry out daily tasks without experiencing severe exhaustion or exacerbating other symptoms"* [15, p. 159]. So the Neeve engine claims only what the literature actually supports: the ring can detect candidate stand events with HR rises consistent with POTS criteria, surface those events for clinician review, and support pacing by flagging sustained heart-rate elevations that may precede symptoms. It does not claim to diagnose, detect, or predict POTS, in line with the safety language we use across the whole product (§8).

#### 5.1.5 What POTS actually looks like in Australia

This is the part that explains why Neeve exists. The Australian POTS Patient Registry, published by Seeley and colleagues in the Medical Journal of Australia in 2025, is the most directly relevant dataset for Neeve's primary market. They covered 500 participants (mean age 31.3 ± 11.7 years, 86.8% women, 96.6% white, 15.2% adolescents) and the findings most relevant to product design are stark [16, p. 159]:

- **The average time from first symptoms to diagnosis was 6.7 years**, with one quarter of participants (25.5%) waiting more than ten years [16, p. 159].
- **Women waited significantly longer than men:** 7.0 ± 8.6 years for women versus 3.8 ± 5.4 years for men (p = 0.010) [16, p. 159]. This is the seven-year delay figure for women that Neeve cites in marketing.
- **Almost two thirds (64.6%) had their symptoms blamed on anxiety before they were diagnosed** [16, p. 159]. This single number is the strongest reason Neeve exists as a clinical-grade pattern record rather than a wellness tracker — without a long-term record, a short appointment simply has nothing to go on, and the easiest place to land is "anxiety". Neeve puts that missing longitudinal evidence into the patient's and the clinician's hands.
- **More than half (54.5%) had presented to an emergency department with POTS symptoms before diagnosis**, with a median of 3 visits each (IQR 1-5) [16, p. 159].
- **On average, patients had seen 5.2 doctors before diagnosis** (SD 4.6), and were currently seeing 7.5 specialists (SD 4.5) [16, pp. 159-160]. With that many clinicians involved, no single one holds the whole story — which is why the doctor PDF has to be portable and self-contained. The patient is the only constant in the room.
- **22% of participants were unemployed.** 26% reported social outings less than once a month. Mean health-related quality of life on the EQ-5D-5L was 0.591 (SD 0.240) [16, p. 160].
- **Infection was the most common trigger (39.4% of cases)**, with 32.6% of all participants attributing their POTS onset to a SARS-CoV-2 infection [16, p. 160] — the long-COVID overlap that pulls POTS into Neeve's broader chronic-illness positioning.

The authors note that the Australian delay *"was longer than reported overseas, suggesting specific barriers in Australian health care"* [16, p. 160]. For a product whose explicit job is to give chronically-ill Australians evidence their clinicians can act on, this is the headline. The engine, the check-in copy, and the doctor PDF are all calibrated against the registry's picture of the typical Australian POTS patient: a young woman whose symptoms have been put down to anxiety, who has seen five doctors and three emergency departments, and whose ring-derived pattern record is the most credible piece of longitudinal evidence she can bring to her next appointment — something that earns a serious conversation, on the clinician's side as much as hers.

> **Evidence → product (POTS engine summary)**
>
> **Evidence:** POTS criteria require a sustained HR rise ≥30 bpm on standing AND absence of orthostatic hypotension [12, p. e43]. AST has "relatively low" test-retest reliability [13, p. 2]. MAPS ≥42 separates POTS from controls with 96.8% sensitivity and 98.0% specificity [14, p. 95]. Australian women wait 7.0 years for diagnosis; 64.6% are told it's anxiety first [16, p. 159].
> **Product rule:** Engine surfaces a "POTS-pattern candidate" only when sustained HR rise + duration criteria are met across multiple separate days. Orthostatic hypotension cannot be excluded by the ring — engine requires cuff BP (see BP-cuff calibration system) to make that exclusion. Engine never claims diagnosis. MAPS administered at onboarding and every 4 weeks for users in POTS-mode.
> **User-facing language:** *"Your heart rate rose [X] bpm after standing and stayed up for [Y] minutes — this is a pattern worth discussing with your clinician."*
> **Doctor-facing language:** *"Wearable-derived POTS-pattern candidate. [N] events over [W] days. Standing HR rise: median [X] bpm (range [Y–Z]). Orthostatic hypotension cannot be excluded — clinical BP measurement required. MAPS total [score] (cut-off ≥42, sens 96.8% / spec 98.0% per Spahic et al)."*

### 5.2 ME/CFS + Long COVID — post-exertional malaise as the diagnostic signal

Post-exertional malaise is not normal tiredness. It is a delayed worsening of symptoms — physical, cognitive, immune, autonomic — after physical, cognitive, emotional, or orthostatic exertion. It is the single feature that separates ME/CFS from every other fatiguing illness, and the same feature that turns Long COVID, in a defined subset of people, into ME/CFS. Everything the Neeve ME/CFS engine does is built around catching this delayed worsening, naming it honestly, and never speeding the person up while it's happening.

#### 5.2.1 What PEM actually is (and isn't) — diagnostic criteria

The people who wrote the diagnostic criteria treated PEM as the one thing the illness can't be without. The International Consensus Criteria, written by 26 clinicians and researchers from 13 countries with around 400 years of combined clinical experience between them, made PEM the compulsory feature of the disease. They renamed it postexertional neuroimmune exhaustion (PENE) — a more technical way of saying the crash hits the nervous and immune systems, not just the muscles — to push back against the idea that "malaise" — *"a vague feeling of discomfort or fatigue"* [17, p. 331] — is anywhere near adequate as a description. The criteria require all of the following:

> *"1. Marked, rapid physical and/or cognitive fatigability in response to exertion, which may be minimal such as activities of daily living or simple mental tasks, can be debilitating and cause a relapse. 2. Postexertional symptom exacerbation: e.g. acute flu-like symptoms, pain and worsening of other symptoms. 3. Postexertional exhaustion may occur immediately after activity or be delayed by hours or days. 4. Recovery period is prolonged, usually taking 24 h or longer. A relapse can last days, weeks or longer. 5. Low threshold of physical and mental fatigability (lack of stamina) results in a substantial reduction in pre-illness activity level."* [17, p. 329]

Four things in that text matter for Neeve's engine. The trigger can be tiny — *"minimal such as activities of daily living or simple mental tasks"* [17, p. 329]. The worsening can be **delayed by hours or days**, not minutes. Recovery is **prolonged**, with a floor of 24 hours. And — the ICC is unusually clear on this — fatigue in this illness is **not proportional to the trigger**, which is exactly the opposite of how a healthy body works. The contrast is in the paper: *"Fatigue in other conditions is usually proportional to effort or duration with a quick recovery and will recur to the same extent with the same effort or duration that same or next day"* [17, p. 328].

There's a questionnaire that turns all of this into something you can actually ask someone. The DSQ-PEM, validated by Cotler and colleagues, is the questionnaire-level operationalisation of all this. It uses five core PEM frequency/severity items plus five supplementary duration items, and it is the screening instrument recommended by the NIH/CDC Common Data Elements working group [18]. The five core items — *"Dead, heavy feeling after starting to exercise; Next day soreness or fatigue after non-strenuous, everyday activities; Mentally tired after the slightest effort; Minimum exercise makes you physically tired; Physically drained or sick after mild activity"* [18, p. 7] — capture the disproportion and the next-day onset directly. The single most telling thing turned out to be how long the crash lasts. PEM duration of 24 hours or more correctly classified ME/CFS against multiple sclerosis and post-polio syndrome with sensitivity 73.4% and specificity 88.6%; broadening the threshold to 14 hours gave sensitivity 87.5% and specificity 77.8% [18, p. 5]. The single best discriminator was duration: *"the PEM duration DSQ item was the most effective in differentiating ME and CFS from MS and PPS… PEM duration, in which exertion has prolonged effects, occurs more often and with greater duration among those with ME and CFS relative to MS and PPS"* [18, p. 6].

For the engine, this means PEM is not a 0-10 fatigue spike on the day of exertion. It is a **delayed**, **disproportionate**, **prolonged**, multi-system worsening with a clinically meaningful floor at roughly 14 to 24 hours of duration.

#### 5.2.2 How PEM gets measured objectively — 2-day CPET

There is a test that proves PEM is a real, physical event and not just a feeling, and it's one of the strongest pieces of evidence in the whole field. The two-day cardiopulmonary exercise test — an exercise test on a bike or treadmill, repeated 24 hours apart — is the strongest objective evidence that PEM is a real physiological event, not a self-report artefact. Healthy people can repeat a maximal exercise test 24 hours later and reproduce their workload. People with ME/CFS, on average, cannot.

When researchers pooled the studies, the split between patients and healthy people was clear-cut. Lim and colleagues' meta-analysis pooled five 2-day CPET studies (98 ME/CFS patients, 51 healthy controls) and looked at four parameters across both days: oxygen uptake at peak and at ventilatory threshold (VO₂peak, VO₂@VT), and workload at peak and at ventilatory threshold (Workload_peak, Workload@VT). The pattern was consistent. From Test 1 to Test 2, **all four measures increased in controls and decreased in patients** [19, p. 8]. Workload at ventilatory threshold was the most discriminating: a fall of -14.6 W in patients vs a rise of +6.5 W in controls between days [19, p. 5], and the between-group difference was significant only on Test 2 (-10.8 W on Test 1 vs -33.0 W on Test 2, p < 0.05) [19, p. 6]. Their own summary:

> *"Workload@VT showed the most notable significant difference (p < 0.05)… ME/CFS patients appeared to have lower levels of all parameters than controls, especially on Test 2… on Test 2, the difference between the patients and controls was observed to be larger at VT than at peak."* [19, pp. 9]

Here's what that means in plain terms, and why Neeve cares. Ventilatory threshold is approximately the point at which a person crosses from aerobic into anaerobic metabolism — roughly, the point where the body switches from its efficient, sustainable way of making energy to a costly, short-lived one. Healthy people sit comfortably above it during everyday activity. People with ME/CFS push into anaerobic metabolism at a much lower workload, and lower again the day after exertion. As Lim et al put it, *"Lower work capacity on Test 2 than on Test 1 seems to be a unique feature of ME/CFS"* [19, p. 10] — patients with lung, heart, kidney disease, MS, and HIV did not show the same Test-2 collapse. The ring cannot run a CPET, but it can track time-above-threshold heart-rate proxies (e.g. % of estimated HR_max held during the day), and it can flag a 24-48 hour recovery window after a high-strain day. The 2-day CPET literature is the physiological grounding for surfacing those windows as "possible PEM window — yesterday's load may explain today's symptoms" rather than inventing the idea.

#### 5.2.3 Why Long COVID is ME/CFS for this engine — the RECOVER incidence data

For a large group of people, Long COVID and ME/CFS are the same illness with different start dates — and that's why one engine can serve both. The RECOVER-Adult study followed 11,785 SARS-CoV-2-infected and 1,439 uninfected adults across the US, applying the 2015 IOM clinical diagnostic criteria for ME/CFS at six months or later [20]. The findings justify treating Long COVID and ME/CFS as the same engine for our purposes.

People who'd caught COVID went on to develop ME/CFS at nearly five times the rate of those who hadn't. The incidence of ME/CFS in newly-infected participants was 2.66 per 100 person-years vs 0.93 per 100 person-years in matched uninfected controls — *"a hazard ratio of 4.93 (95% CI 3.62-6.71)"* [20, p. 1085]. PEM was the most common single ME/CFS symptom in infected participants: *"Post-exertional malaise was the most common ME/CFS symptom in infected participants (24.0%, 2830 of 11,785)"* [20, p. 1085]. And the overlap with Long COVID itself was almost total: *"Most participants with post-COVID-19 ME/CFS also met RECOVER criteria for long COVID (88.7%, 471 of 531)"* [20, p. 1085], with 45.0% of these participants falling into PASC cluster 4 — *"the most symptomatic PASC subgroup with the highest frequency of ME/CFS defining symptoms"* [20, p. 1092].

The plain reading: Long COVID is, in a defined and large subset, post-infectious ME/CFS. The clinical features overlap. PEM is the leading symptom in both. Building two separate engines would be duplication. One engine, tuned to PEM as the diagnostic signal, serves both populations.

#### 5.2.4 Pacing as the actual management strategy — energy envelope theory

The official advice on managing ME/CFS has changed, and the new advice is about staying within your limits, not pushing past them. Since the 2021 NICE guideline update, graded exercise therapy and CBT are no longer recommended for ME/CFS. **Pacing is the only management strategy NICE recommends** [21, p. 3]. The Sanal-Hayes scoping review summarises what pacing actually means in the literature: a way of *"regulating activity to avoid post exertional malaise (PEM), the worsening of symptoms after an activity"*, with the goal being *"to be as active as possible within the limits imposed by the illness"* [21, p. 1].

The idea underneath pacing is a daily energy budget — you have a set amount, and going over it triggers a crash. The clinical theory underneath this is the **energy envelope**. Patients estimate their available daily energy and aim to expend at or below that envelope, *"asked patients to estimate their current physical capabilities prior to commencing an activity and then complete 25-50% less than their perceived energy envelope"* [21, p. 4]. The strategies that work, across studies, cluster around four behaviours: *"activity planning, activity consistency, activity progression, activity adjustment and staying within the Energy Envelope"* [21, p. 17]. Of these, **activity consistency** (similar amounts each day, no big spikes) and **staying within the envelope** had the best symptom outcomes: *"Staying within the Energy Envelope was reported to reduce PEM severity, improve physical functioning… and more hours engaged in activity than individuals with lower available energy"* [21, p. 17].

The reviewers pointed straight at the gap a wearable could fill: almost nobody has actually measured pacing with a device over time. They were direct about what was missing from the existing literature, and what wearables could change: *"it is an astonishing observation from this scoping review that only two studies objectively measured physical activity to quantify changes to activity as a result of pacing. If the aim of pacing is to reduce physical activity, or reduce variations in physical activity (i.e., push-crash cycles), only two studies have objectively quantified the effect pacing had on physical activity"* [21, p. 17]. They go further: *"longitudinal tracking would also enable activities and other behaviours (sleep, stress) to be linked to bouts of PEM. Linking would enable a deeper insight into potential PEM triggers and mitigations that might be possible"* [21, p. 18].

This is the exact gap Neeve fills. Pacing supported by a ring and a check-in that links exertion to next-day symptom load is what the literature has been asking for. What the ring cannot replace is the user's own felt sense of where their envelope is today — energy capacity in ME/CFS shifts day to day, sometimes hour to hour, and any system that overrides the user's self-report with a biometric "you have plenty left" reading would be unsafe.

**The Australian burden.** Australians with ME/CFS are living far below the general population on every measure of quality of life — and the worst-hit areas are exactly the ones the illness attacks. Eaton-Fitch and colleagues surveyed 480 Australians with ME/CFS using the SF-36 and found health-related quality of life *"significantly impaired … across all domains compared with the general population"*, with the lowest scores in physical role (4.11 ± 15.07) and energy/fatigue (13.54 ± 13.94) [62]. Impaired physical functioning was associated with *"females, higher body mass index (BMI), employment status, cognitive difficulties, sensory disturbances and cardiovascular symptoms"* [62] — the multimorbid, autonomic-overlapping picture Neeve is built for, in the Australian population it serves.

#### 5.2.5 What the Neeve ME/CFS engine does

- **What the ring measures passively that's useful:** activity load (steps, motion bouts) plotted against the user's own rolling baseline; time above an anaerobic-threshold proxy (% of estimated HR_max held during the day); resting heart rate; HRV; sleep architecture (total, deep, REM, fragmentation); recovery time (hours/days for resting HR and HRV to return to baseline after a high-load day).
- **What the user must self-report:** fatigue (0-10), brain fog (0-10), pain (0-10), and a crash event ("I had a crash") with structured follow-up — trigger context (physical / cognitive / emotional / orthostatic), time-to-onset (immediate / hours / next day / 2+ days), severity (mild / moderate / severe / very severe), and functional impact ("what I couldn't do today"). The DSQ-PEM is administered as a periodic reflective check-in (suggested 4-weekly) where its 6-month recall window holds.
- **What the ring cannot know:** subjective severity, exertion type (cognitive vs emotional vs physical vs orthostatic — all four trigger PEM but the ring only sees physical), individual energy-envelope thresholds (these are personal and shift), medication state, comorbidity load, and where the user is in their own felt window.
- **What the engine surfaces, with confidence labels:**
  - *"Possible PEM window — yesterday's high-strain afternoon may explain today's symptoms. Confidence: [low/medium/high] based on signal strength and days of baseline data."*
  - *"Activity over the last [N] days has been [more variable / more consistent] than your usual. Consistency tends to correlate with fewer crash days in your history."*
  - *"Resting HR has been [X] bpm above your 14-day baseline for [Y] days; this often precedes a crash for you."* (Only after enough personal history exists for "for you" to mean something.)
- **What the engine NEVER claims:** "PEM detected." "ME/CFS detected." "You have ME/CFS." "You have Long COVID." "You're recovered." "You're safe to exercise." Diagnosis is a clinician's call. Recovery is the user's call. The engine identifies possible patterns and supports the conversation; it never closes it.

> **Evidence → product (ME/CFS + Long COVID engine summary)**
>
> **Evidence:** PEM is the compulsory diagnostic feature of ME/CFS, with delayed onset, prolonged recovery (≥24 h), and disproportion to trigger [17, p. 329]; it is objectively reproducible on 2-day CPET as a Test-2 drop in workload at ventilatory threshold not seen in healthy controls or other fatiguing illnesses [19, pp. 6, 10]; SARS-CoV-2 infection confers a 4.93x hazard ratio for new-onset ME/CFS, with PEM the leading symptom in 24.0% of infected participants [20, p. 1085]; NICE (2021) recommends pacing as the only management strategy, but the literature lacks objectively-measured longitudinal data linking exertion to PEM [21, pp. 3, 17].
> **Product rule:** One engine serves ME/CFS and Long COVID, anchored on PEM as the diagnostic signal. The engine cross-references ring-derived exertion load (activity, % time above HR threshold proxy, recovery curves) with user-reported crash events on a 24-72 hour lag window. DSQ-PEM administered at onboarding and 4-weekly thereafter. The engine surfaces possible PEM windows with confidence labels; never claims diagnosis; never recommends exercise progression.
> **User-facing language:** *"Possible PEM window. Yesterday's load was higher than your usual, and your symptoms today fit a pattern we've seen before in your data. Rest is reasonable. This isn't a diagnosis — it's a pattern worth noticing."*
> **Doctor-facing language:** *"Patient-reported PEM events: [N] over [W] weeks, with structured trigger, onset-delay, severity, and functional-impact data per event. DSQ-PEM total [score], duration item [hours], administered [date]. Ring-derived exertion load aligned with PEM events on a [median lag] hour window. Engine identifies possible PEM patterns per Carruthers ICC [17] and Cotler DSQ-PEM [18] criteria; does not constitute diagnosis."*

### 5.3 Migraine — prodrome detection + trigger pattern analysis

Migraine is the third per-condition pattern engine in Neeve, and the reason is hopeful: of all the conditions we work with, migraine has the strongest evidence for a real warning window before the pain arrives. That window is called the prodrome — the hours, sometimes a day or more, when the body shifts before a headache starts. People feel tired. Lights get sharper. The neck stiffens. The mood drops. If a ring and a quiet app can pick up even part of that shift, the user gets something precious: time. Time to slow down, dim the screen, take medication early if their doctor prescribed it, cancel a plan. That window is exactly where a wearable plus a short check-in could matter most. The engine's job is to identify a possible early-warning pattern. It never says "migraine predicted" or "migraine imminent" — that boundary is set in §10.

#### 5.3.1 What migraine actually is (diagnostically)

Migraine is not just a bad headache — it is a defined neurological condition, and the definition matters for what the engine is allowed to say. The International Classification of Headache Disorders, 3rd edition (ICHD-3) — the standard rulebook doctors use to name headache types — describes migraine as a recurring condition with attacks that last hours to days, are usually one-sided, throbbing, made worse by ordinary movement, and come with nausea or strong sensitivity to light and sound. A subset of people also get aura — visual, sensory or speech symptoms that come before the pain. The 2018 ICHD-3 criteria are sharper than the older 2013 ICHD-3 beta version: in an emergency-room study of 128 patients, ICHD-3 had 96% specificity for migraine with aura and 98% for migraine with typical aura — significantly better than ICHD-3 beta, especially for telling a first single attack apart from a transient ischaemic attack (TIA — a brief stroke-like episode) [22, p. 1]. The authors found *"the new ICHD-3 diagnostic criteria for migraine with aura and migraine with typical aura display an excellent specificity (96 and 98% respectively), and are significantly more specific than the previous ICHD-3 beta classification system when it comes to diagnosing a first single attack"* [22, p. 1]. Neeve uses ICHD-3 as its diagnostic frame and never attempts to tell aura symptoms apart from a TIA in software — that decision belongs to a clinician.

#### 5.3.2 The prodrome window — what the literature says

The big question is whether the warning window is real and consistent enough to build on, and the best dataset says yes. It comes from the PRODROME trial screening period. Over 60 days, 920 adults with migraine logged 4,802 "qualifying prodrome events" in an electronic diary — moments where they were confident a headache would follow within 1 to 6 hours [23, p. 1]. The findings give Neeve its baseline:

- The most common prodromal symptoms across 4,802 events were *"sensitivity to light (57.2%; 2,748/4,802), fatigue (50.1%; 2,408/4,802), neck pain (41.9%; 2,013/4,802), sensitivity to sound (33.9%; 1,630/4,802), either difficulty thinking or concentrating (30.0%; 1,442/4,802), and dizziness (27.8%; 1,333/4,802)"* [23, p. 1].
- Within each person, these symptoms were strikingly consistent — *"participants who reported fatigue experienced fatigue, on average, during 92.0% (SD: 17.7%) of their qualifying prodrome events"* and neck pain showed a similar mean prevalence rate of 92.5% [23, p. 6].
- The 1–6 hour window held up: *"Of all qualifying prodrome events reported, 81.5% (3,913/4,802) were followed by headache of any intensity within 1–6 hours"* and 68.3% were followed by a moderate-to-severe headache in the same window [23, pp. 1, 4].
- At the individual level, *"a mean of 84.4% of their qualifying prodrome events were followed by a headache within 1–6 hours, with 76.9% of participants identifying qualifying prodrome events that were followed by headache within 1–6 hours ≥75% of the time"* [23, p. 1].

The take-away for Neeve: people who pay attention to their own prodrome are usually right. The engine should treat the user's self-identified prodrome symptoms as the single most informative input it has.

#### 5.3.3 EMA in prodrome detection

The PRODROME study used a diary; the next study is even closer to what Neeve actually does. Houtveen and Sorbi ran an 87-patient study using ecological momentary assessment (EMA) — short prompts on a phone, several times a day, with each pre-attack moment compared to that same person's own calm, between-attacks baseline (what the literature calls the interictal state) [24, p. 1]. The headline is that the shift is concentrated and late: they found that *"the prodromal change in migraine - relative to interictal functioning - predominantly exists within the last 12 hours before attack onset"* [24, p. 1]. The clusters that increased significantly in those last 12 hours were sensory sensitivity, pain/stiffness and fatigue, with a tendency for increased negative affect; positive affect and cognitive functioning were impaired earlier, with a dip 25–36 hours out and a bigger dip in the final 12 hours [24, p. 1]. The study also pushed back on a common belief: *"effort spent and stressors encountered both did not predict attack occurrence"* once interictal baseline was controlled for [24, p. 8]. The lesson Neeve takes from this: change is measured against the person's own baseline, not against a population average, and the most informative comparison is the day-before versus a recent typical day.

#### 5.3.4 Wearable detection of pre-migraine nights

So a diary works — but can a wearable see the shift on its own? The Kapustynska et al. 2024 study is the closest published model to what the Neeve Ring can do tonight, and the answer is "partly". Ten people with episodic migraine wore an Empatica Embrace Plus on the wrist; the team trained machine-learning models on overnight signals to separate pre-migraine nights from migraine-free nights [25, p. 1]. The signals that mattered:

- *"The features of electrodermal activity, skin temperature, and accelerometer exhibited the highest F-statistic values and the most significant p-values in the 5 and 10 min frames, which makes them particularly useful for the early detection of migraines"* [25, p. 1].
- Short 5- and 10-minute analysis windows beat longer ones — finer-grained signals captured more of the pre-migraine shift than averaged hours [25, p. 17].
- The generalised XGBoost model across all ten people reached *"0.806 for accuracy, 0.638 for precision, 0.595 for recall, and 0.607 for F1-score"* with a 5-minute frame [25, p. 1]. The authors are honest about the cost: *"the current generalized model, while robust in certain metrics, may not be sufficiently sensitive for clinical application, as it risks failing to detect a substantial number of true migraine events"* [25, p. 18].

So a wrist wearable can pick up the pre-migraine night signal — but not reliably enough on its own to replace a person's report. One caveat binds the Neeve build: the signals that drove Kapustynska's model — electrodermal activity (skin conductance, a sweat-related measure) and skin temperature — came from an Empatica wrist band and are **not available on the current Neeve Ring** (reflective PPG + accelerometer; see §4.2). The migraine engine therefore leans on the inputs it does have — nightly HRV (RMSSD, a heart-rate-variability measure), respiration-rate trend, sleep architecture, resting-HR drift — plus the user's logged prodrome. The Neeve design is direct: ring signals raise or lower confidence in a pattern; the user's own logged prodrome is the anchor.

#### 5.3.5 MIDAS — the validated impact PRO

To know whether anything is actually helping, Neeve needs a properly validated way to measure how much migraine is disrupting a person's life — not a homemade rating. The Migraine Disability Assessment (MIDAS) is the most used instrument in migraine research, with five items covering missed and reduced work, household and social days over a recall period [26, p. 1]. Carvalho et al. ran the first proper analysis of how sensitive MIDAS is to real change, in 103 patients with chronic or high-frequency episodic migraine. They found that *"a change of 4.5 points or more represents a clinically important change for patients with high frequent migraine and chronic migraine"* [26, p. 1], with a standard error of measurement of 1.5 points and a 95% minimum detectable change of 4.3 points [26, p. 3]. Responsiveness was *"limited"* (AUC 0.63–0.68) but the 4.5-point threshold was stable across three timepoints [26, p. 1]. Neeve uses MIDAS at intake and at quarterly review, treats a ≥4.5-point reduction as a meaningful change worth showing the user and their doctor, and never claims smaller score shifts are clinically real.

#### 5.3.6 What the Neeve migraine engine does

**What the ring measures passively (continuous, no user action):**
- Resting heart rate and HR baseline drift
- Heart rate variability (RMSSD)
- Sleep duration, sleep architecture proxies, and sleep-detection-stage labels overnight
- Step pattern and activity counts (used as context, not as a hero metric — see binding rule on steps)

*Not available on the current Neeve Ring:* skin temperature and electrodermal activity are informative in the migraine wearable literature [25] but the R11M (reflective PPG + accelerometer only — see §4.2) exposes neither. They become engine inputs only if future hardware supports them.

**What the user must self-report (because no ring can know it):**
- Subjective prodrome symptoms — fatigue, light sensitivity, sound sensitivity, neck stiffness, fog, food cravings, mood change, yawning
- Headache onset, side, severity, duration
- Medication taken and time taken
- Aura, if it occurs (visual, sensory, speech)
- Perceived triggers (food, weather, hormonal phase, sleep loss, stress event)

**What the ring cannot know:**
- The subjective severity of photophobia or phonophobia (sensitivity to light or to sound)
- Whether aura is present
- Whether a specific trigger caused this specific attack
- Whether a medication actually worked, vs. the attack ending on its own

**What the engine surfaces, with confidence labels:**
- "Possible early-warning pattern — your HRV is lower than your 14-day baseline, your overnight breathing rate is up, and you've logged 2 of your usual prodrome symptoms in the last 6 hours." Confidence is set by signal strength and how closely the current pattern matches the user's own past prodromes.
- A personal prodrome fingerprint after enough events (the PRODROME data suggest within-person consistency is high once a handful of events are logged) — "your usual warning signs are fatigue, neck stiffness and light sensitivity, and they typically come 1–6 hours before the headache."
- MIDAS change since last quarter, shown only when the change is ≥4.5 points.

**What the engine never claims:**
- "Migraine predicted"
- "Migraine imminent"
- "Migraine detected"
- "Your trigger was X"
- Any verdict on aura vs. TIA — that line is for a clinician.

> **Evidence → product (Migraine engine summary)**
>
> **Evidence:** 4,802 prodrome events in the PRODROME trial showed light sensitivity (57.2%), fatigue (50.1%) and neck pain (41.9%) as the most common warning symptoms, with 81.5% of events followed by headache within 1–6 hours [23, pp. 1, 4]; EMA work confirmed the prodromal shift is concentrated in the final 12 hours and is best detected against each person's own baseline [24, p. 1]; wearable nocturnal signals (EDA, skin temperature, accelerometer) carry a real but modest pre-migraine signal (XGBoost F1 0.607 in a 10-person model) [25, pp. 1, 18]; MIDAS detects clinically meaningful change at ≥4.5 points [26, p. 1].
> **Product rule:** The engine compares overnight ring signals and recent self-logged symptoms against the user's own 14-day interictal baseline; when both shift in the direction of that user's known prodrome fingerprint, it surfaces a possible early-warning pattern with a confidence label, and it never claims a migraine is detected, predicted or imminent.
> **User-facing language:** *"Your overnight HRV is lower than your usual range and you've logged 2 of your usual warning signs in the last 6 hours. This pattern has come before a migraine for you before. It might be worth slowing down."*
> **Doctor-facing language:** *"Over the last 90 days, Patient logged 7 migraine attacks. In 6 of 7, a self-identified prodrome (most often fatigue, neck stiffness, light sensitivity) preceded the headache by 1–6 hours, consistent with PRODROME trial findings. Overnight HRV and respiration-rate shifts were observed on the night before 5 of the 7 attacks. MIDAS score changed from 22 to 16 over this period (≥4.5-point clinically meaningful improvement)."*

### 5.4 Endometriosis — cyclical pain, diagnostic delay, comorbidity cluster

For many of the women Neeve is built for, endometriosis travels in the same pack as POTS and ME/CFS. The wait for a diagnosis is measured in years — the pain gets brushed off as "just bad periods," and the years tick by. It overlaps with migraine, fibromyalgia, IBS, chronic pelvic pain, and autonomic dysfunction (the body's automatic systems — heart rate, blood pressure, digestion — running off-kilter) in ways that look like coincidence until you read the prevalence data. The engine's job is not to diagnose endometriosis — that's a clinician's call, and the gold standard still involves imaging or laparoscopy (keyhole surgery to look inside the pelvis directly). Its job is to capture how the pain and other symptoms rise and fall with the menstrual cycle, hold that pattern alongside a validated impact measure, and hand the woman evidence that earns a serious conversation.

#### 5.4.1 What endometriosis is (and the diagnostic delay problem)

Endometriosis is a disease where tissue like the lining of the womb grows where it shouldn't — mostly elsewhere in the pelvis. The 2022 ESHRE guideline — the most recent international consensus document — defines it as a chronic inflammatory disease in which tissue resembling the lining of the uterus grows outside it, mostly in the pelvis. Because the growth is driven by the hormone oestrogen, it tracks the menstrual cycle. Pain and infertility are the two clinical hallmarks. Around 190 million women and adolescent girls worldwide are affected during reproductive age [27, p. 6].

The part that matters most for how we design the product is the delay. ESHRE puts it plainly:

> *"Despite all of this, there still exists a large diagnostic void between the onset of symptoms and a reliable diagnosis averaging between 8-12 years."* [27, p. 6]

The delay isn't anyone's fault — it's built into the problem from several directions. Part of it is biological: superficial endometriosis on the lining of the pelvis is genuinely hard to see on a scan, and ESHRE notes that *"a negative finding does not exclude endometriosis, particularly superficial peritoneal disease"* [27, p. 9]. Part is structural — laparoscopy is invasive and expensive. And part is cultural: severe period pain still gets normalised by patients and clinicians alike.

The signs ESHRE asks doctors to take seriously come on a cycle and off a cycle, and the list is wider than most women are ever told:

> *"dysmenorrhea, deep dyspareunia, dysuria, dyschezia, painful rectal bleeding or haematuria, shoulder tip pain, catamenial pneumothorax, cyclical cough/haemoptysis/chest pain, cyclical scar swelling and pain, fatigue, and infertility."* [27, p. 9]

In plain English, that's painful periods, deep pain during sex, painful urination, painful bowel movements, blood in stool or urine that comes with the cycle, shoulder-tip pain, lung symptoms that flare around bleeding, fatigue, and trouble conceiving. The word *cyclical* keeps coming up. That cyclicality — symptoms timed to the menstrual cycle — is exactly the signal Neeve is built to capture.

ESHRE also says something that, in effect, gives Neeve its mandate. It notes that symptom diaries may help, even though there isn't yet trial-grade evidence that they shorten the time to diagnosis:

> *"Although currently no evidence exists that a symptom diary/questionnaire/app reduces the time to diagnosis or leads to earlier diagnosis, the GDG considers their potential benefit in complementing the traditional history taking process as it aids in objectifying pain and empowering women to demonstrate their symptoms."* [27, p. 23]

That one sentence is both the regulatory ceiling and the product brief. Objectify the pain. Empower the woman. Complement the doctor's history-taking — work alongside the clinician, not around them. Do not claim to diagnose.

#### 5.4.2 EHP-30 — the validated disease-impact PRO

To track how much the disease is wearing down a woman's life over months, we use a questionnaire built and tested for exactly that. The Endometriosis Health Profile 30 (EHP-30) is the most thoroughly validated endometriosis-specific quality-of-life questionnaire in the literature — a PRO, or patient-reported outcome, meaning the patient's own account is the data. It was developed by Jones and colleagues in 2001 from women's own descriptions of what mattered to them, and has since been translated and re-validated across more than a dozen languages. Hansen and colleagues' 2021 confirmatory factor analysis in 304 Danish women with endometriosis settled a long-running debate about its internal structure, supporting the original five-factor model [28].

It covers five areas of life. The five subscales are *pain*, *control and powerlessness*, *emotional wellbeing*, *social support*, and *self-image*. Each is scored 0-100, where lower is better quality of life. Items are rated *"Never (0); Rarely (1); Sometimes (2); Often (3); and Always (4)"* [28, p. 3]. The questionnaire hangs together tightly — its internal consistency (how well the items in each area agree with each other) is excellent: *"Cronbach's alpha for 'pain' = 0.96, 'control and powerlessness' = 0.94, 'emotional wellbeing' = 0.91, 'social support' = 0.88 and 'self-image' = 0.88"* [28, p. 5]. It also gives stable answers when re-taken — test-retest reliability over a 6-12 week interval was high — and, crucially for a disease that comes and goes with the cycle, the score did not drift depending on where the woman was in her cycle:

> *"scoring might be largely unaffected by the cyclical/menstrual pain symptoms characteristic of endometriosis."* [28, p. 5]

That last property is what makes EHP-30 usable as a long-term impact measure inside Neeve — because the score isn't thrown off by which day of the cycle she fills it in. We can administer it at onboarding and at fixed intervals (a 4-weekly cadence aligns with ESHRE's general "follow-up should be individualised" framing [27, p. 9] and with how the Danish public health system already uses it: *"Once a year, patients are asked to fill out an electronic questionnaire, including relevant parts of EHP-30"* [28, p. 10]). Tracked over time, the subscale trajectories show whether the disease is slowly eroding her life, regardless of where she happens to be in her cycle on the day she answers. The Neeve doctor PDF can carry those trajectories as a clinical-grade impact signal.

#### 5.4.3 The Endometriosis Symptom Diary — daily PRO for cyclical tracking

If EHP-30 measures the slow erosion over months, the Endometriosis Symptom Diary (ESD) measures the day-to-day. Gater and colleagues developed the ESD and its companion weekly Endometriosis Impact Scale (EIS) in 2020 to FDA Patient-Reported Outcome guidance standards, with concept-elicitation interviews — sitting with women and asking, in their own words, what they experience — in 45 women, and cognitive debriefing in 31 more across the US, Germany and France [29].

The ESD is short and done at the end of the day. It's a 12-item electronic diary completed each evening with a 24-hour recall window. It covers worst pain in the "target area" (a body-map diagram, so women with pain in pelvis vs abdomen vs lower back can all anchor consistently), worst constant pain, worst short-term pain, whether the woman had her period in the past 24 hours, worst pain due to period, vaginal bleeding intensity (*"None / Spotting / Light / Normal / Heavy"*), whether she had intercourse, worst pain during or after intercourse, avoidance of intercourse, and three items on pain medication use [29, p. 8]. Pain is rated on a 0-10 numeric scale.

What women said in those interviews is an unusually clear record of what endometriosis actually feels like in their own words — and pain dominates everything:

> *"Pain was identified by all 45 participants (96% of who mentioned this spontaneously) and was described by the vast majority of participants as being the most frequent (92%), most severe (92%) and most bothersome (86%) symptom that they experience"* [29, p. 5]

But it reaches well beyond pelvic pain. Gater documented *"tiredness (n = 40); headaches (n = 29); abdominal bloating (n = 26); nausea (n = 24); constipation (n = 14); vomiting (n = 12); dizziness (n = 12); diarrhoea (n = 9); lack of energy (n = 9)"* [29, p. 7], plus impaired sleep (n = 36), inability to concentrate (n = 28), and emotional impacts in all 45 participants. The ESD doesn't try to capture every one of these — it focuses on the pain, bleeding and pain-medication core that an investigative or treatment study needs. The EIS, completed weekly with a 7-day recall, picks up the impact on physical activity, mood, social life, work, household activities, sleep, and concentration [29, p. 12]. In the pilot, women stuck with it and daily completion averaged 2.5 minutes [29, p. 9] — a usability bar Neeve has to clear too.

For Neeve, the ESD-equivalent items become the daily structured questions for women in the endometriosis engine. The 24-hour recall, the body-map diagram for pain location, and the use of a 0-10 NRS (numeric rating scale) rather than a word-based one are all defensible PRO design choices we can adopt directly.

#### 5.4.4 Australian context — diagnostic delay, prevalence, impact

The clearest local picture comes from an Australian survey. Armour and colleagues' 2020 Australian online survey (n = 409, recruited through Endometriosis Australia, EndoActive and the Pelvic Pain Foundation of Australia) is the cleanest local data point on diagnostic delay and impact [30]. 340 respondents had surgically confirmed endometriosis; 69 had chronic pelvic pain without a confirmed endometriosis diagnosis.

The headline delay figure is grim — but it's getting better, and the trend over time is real:

> *"In the endometriosis cohort there was a mean diagnostic delay of eight years, however there was a reduction in both the diagnostic delay (p < 0.001) and number of doctors seen before diagnosis (p < 0.001) in those presenting more recently."* [30, p. 1]

Broken down by when the woman first sought help, the delay between first seeking medical attention and diagnosis was 9.9 ± 6.6 years before 2005, 4.8 ± 2.6 years between 2005 and 2012, and 1.5 ± 0.7 years from 2013 onwards [30, p. 4]. The number of doctors seen before diagnosis was a mean of 5 ± 4 [30, p. 4]. Symptoms onset was, on average, at age 18 ± 6, and the most common symptoms at onset were severe dysmenorrhea (89.4%), pelvic pain (78.7%), ovulation pain (46.7%), cyclical bowel/bladder symptoms (38.1%), chronic fatigue (38.8%), and deep dyspareunia (32.3%) [30, p. 4]. Australian prevalence of endometriosis sits at *"around 11%"* [30, p. 1].

The impact figures matter as much as how common it is. 57.9% of the endometriosis cohort had lost time in education because of pelvic pain; 58.5% said it had affected their job; 50.3% had to reduce hours; 15.1% had lost a job; 50.3% were scared to tell their employer; 59.4% reported negative impact on personal relationships [30, p. 5]. And — directly relevant to where Neeve fits — the authors point out that even after diagnosis, the system keeps falling short for these women:

> *"Whilst there is a decrease in the time to diagnosis, there is an urgent need for improved treatment options and support for women with the disease once the diagnosis is made."* [30, p. 1]

Armour's survey was Sydney-led, drew respondents nationally, and gives the per-country numbers the Neeve doctor PDF can lean on when putting a patient's symptom-burden trajectory in context. The delay is shrinking but not gone. The toll on work, study, and relationships is the daily texture of the disease — and it's exactly what long-term tracking can make visible.

#### 5.4.5 Comorbidities — why endometriosis sits in a cluster

Endometriosis rarely comes alone. Colombo and colleagues' 2025 systematic review and meta-analysis of 13 studies (32,489 women with endometriosis vs 299,166 controls) gives the strongest current pooled estimate for the migraine overlap [31]:

> *"The risk of migraine was higher in individuals with endometriosis compared to those without (OR 2.25, 95% CI = 1.85-2.72; n = 13 studies; I² = 81%)."* [31, p. 1]

The link was stronger and more certain for migraine *without* aura (OR 2.64, 95% CI 1.89-3.69; I² = 0%) [31, p. 1] than for migraine with aura. In real terms, Colombo reports an absolute risk increase of 46 more migraine cases per 1,000 women for all migraine, and 152 more per 1,000 for migraine without aura [31, p. 7]. And the more severe the endometriosis, the stronger the link — *"a diagnosis of migraine was more than four times more likely in individuals with moderate-severe endometriosis (rASRM stages III-IV) compared to those without (OR 4.52; 95% CI = 2.49-8.20)"* [31, p. 9].

Why these conditions cluster is what makes this a comorbidity-cluster section rather than just a migraine one. Colombo notes:

> *"both endometriosis and migraine have been linked to similar comorbidities, including autoimmune-related traits, fibromyalgia, and chronic fatigue syndrome."* [31, p. 2]

> *"In the context of endometriosis and migraine, the inflammatory and neuro-inflammatory processes associated with both conditions are likely to sensitize central pain pathways, predisposing individuals to the development of nociplastic pain — a type of pain arising from altered nociception, characterized by heightened central nervous system responsiveness to sensory input. This heightened sensitivity amplifies pain perception, even in the absence of ongoing noxious stimuli, and contributes to widespread pain originating from multiple body sites. The concept of chronic overlapping pain conditions provides a useful framework for understanding this association."* [31, p. 10]

In plain terms: chronic overlapping pain conditions, central sensitisation (the nervous system turning up the volume on pain), and shared inflammatory and genetic wiring. The Armour Australian survey adds that 38.8% of the endometriosis cohort reported chronic fatigue as a presenting symptom [30, p. 4]. Autonomic dysfunction shows up in the literature too (the Endometriosis folder contains a paper on altered blood-pressure reflexes in women with endometriosis); we won't claim that overlap is settled, but the fact it's in the literature is one more reason the engine treats endometriosis as part of a wider picture rather than a siloed gynaecological problem.

What this means in the app: a woman with endometriosis in Neeve will often also be tracking migraine, fibromyalgia, IBS, fatigue, or POTS-spectrum symptoms. The engines have to stay coherent across that overlap. The endometriosis engine surfaces cycle-locked patterns. The migraine engine surfaces prodrome and trigger patterns. The doctor PDF holds them together.

#### 5.4.6 What the Neeve endometriosis engine does

- **What the ring measures passively that's useful:** resting HR and HRV trajectories across the menstrual cycle (the four cycle phases each generate their own rolling baseline); sleep architecture (total, deep, REM, fragmentation) across the cycle; activity load and recovery curves. (Skin-temperature drift across the cycle is informative around ovulation in the literature, but is **not available on the current Neeve Ring** — reflective PPG + accelerometer only, see §4.2 — so it is not a current input; future hardware only.)
- **What the user must self-report (daily, ESD-derived):** worst pelvic pain in the past 24 hours (0-10); pain location using a body-map diagram (pelvic / lower abdomen / lower back / leg / chest / other — multi-select, because pain in the legs from radiating pelvic pain is documented [29, p. 6]); whether she had her period in the past 24 hours; worst period pain (0-10); vaginal bleeding intensity (None / Spotting / Light / Normal / Heavy); dyschezia (painful bowel movements, yes/no + severity); dyspareunia (if intercourse occurred); dysuria (painful urination, yes/no + severity); fatigue (0-10); mood and anxiety (0-10); medication taken (free-text or structured); free-text "anything to add" (per the locked decision).
- **What the user reports periodically (4-weekly):** the EHP-30 in full, so the five subscale trajectories are tracked over time. The Hansen finding that EHP-30 scoring is largely independent of cycle phase [28, p. 5] means we don't need to anchor administration to a specific cycle day.
- **What the ring cannot know:** ovulation timing without external signals (LH strips, basal temperature charting, or app-logged cycle data); hormonal levels; lesion presence, location, or stage; the woman's contraceptive state and what it is suppressing; whether she had surgery and how recently. The engine asks for these as user-supplied context where they meaningfully change interpretation.
- **What the engine surfaces, with confidence labels:**
  - *"Your pain has tracked your cycle for the last [N] cycles — pain has peaked on days [X-Y] and dropped by day [Z]. Confidence: [low/medium/high] based on cycles of data."*
  - *"Your EHP-30 pain and control-and-powerlessness subscales have been trending [up/down/stable] over the last [N] months."*
  - *"Symptoms outside the pelvis — migraine, fatigue, gut — have clustered around the same cycle days as your pelvic pain in your recent data. This pattern of overlap is described in the literature."*
  - *"Heavy bleeding days have coincided with [N] more low-recovery nights this cycle than your usual."* (Only after enough cycles of personal history exist for "your usual" to mean something — minimum 2 cycles, ideally 3.)
- **What the engine NEVER claims:** "Endometriosis flare detected." "Endometriosis confirmed." "Endometriosis ruled out." "You have endometriosis." "You don't have endometriosis." "Your endometriosis is getting worse." Diagnosis is a clinician's call confirmed by imaging or laparoscopy [27, p. 9]. The engine identifies cyclical patterns and surfaces validated impact trajectories. It does not interpret what the underlying disease is doing.

> **Evidence → product (Endometriosis engine summary)**
>
> **Evidence:** Endometriosis affects around 11% of Australian women, presents most commonly as severe dysmenorrhea (89.4%) and pelvic pain (78.7%), and carried a mean diagnostic delay of 8 years in the Armour Australian cohort (with 1.5 years for women first presenting from 2013 onwards) [30, pp. 1, 4]; ESHRE's 2022 guideline confirms the cardinal cyclical symptoms and explicitly endorses symptom diaries as a means of *"objectifying pain and empowering women to demonstrate their symptoms"* [27, pp. 9, 23]; EHP-30 is a validated five-factor PRO with subscale Cronbach's alpha at least 0.88 whose scoring is largely independent of cycle phase, making it usable as a longitudinal impact trajectory [28, p. 5]; the FDA-grade Endometriosis Symptom Diary provides a 12-item daily structure with 24-hour recall covering pain, bleeding, dyspareunia and analgesic use, completing in around 2.5 minutes [29, pp. 8-9]; migraine is more than twice as common in women with endometriosis (pooled OR 2.25, 95% CI 1.85-2.72; n = 13 studies; 32,489 cases) and the comorbidity cluster extends to fibromyalgia, chronic fatigue syndrome, and central-sensitisation pain syndromes [31, pp. 1-2, 10].
> **Product rule:** The endometriosis engine captures daily ESD-derived symptom items (pelvic pain, location via body-map, bleeding, dyspareunia, dyschezia, dysuria, fatigue, mood, medication) anchored to cycle day, and administers EHP-30 at onboarding and 4-weekly. Ring data (HR, HRV, sleep) is held as context across cycle phases. The engine surfaces cycle-locked patterns and impact trajectories with confidence labels; it never claims a flare, a diagnosis, or a verdict on disease activity. Comorbid migraine, fatigue, and pain overlap are treated as part of the same picture, not separate apps.
> **User-facing language:** *"Your pain has tracked your cycle for the last three cycles — it has peaked around days 1-3 of bleeding and eased by day 7. Your fatigue has followed the same shape. This is a pattern worth bringing to your doctor. It's not a diagnosis — it's evidence."*
> **Doctor-facing language:** *"Patient-reported endometriosis-pattern data: [N] cycles tracked. ESD-derived daily items including worst pelvic pain (NRS 0-10), pain location (body-map), bleeding intensity, dyspareunia, dyschezia, dysuria, fatigue, mood, and analgesic use. Cycle-locked symptom trajectories displayed. EHP-30 administered at onboarding and 4-weekly; current subscale scores: pain [X], control and powerlessness [X], emotional wellbeing [X], social support [X], self-image [X], with [N]-month trajectory. Comorbid symptoms (migraine, fatigue, gut) co-tracked and cycle-aligned where present. Patterns surfaced per ESHRE 2022 cyclical/non-cyclical signs and symptoms [27] and validated PROs [28, 29]; data does not constitute diagnosis."*

**Bibliography**

27. Becker CM, Bokor A, Heikinheimo O, Horne A, Jansen F, Kiesel L, et al. ESHRE guideline: endometriosis. Hum Reprod Open. 2022;2022(2):hoac009.
28. Hansen KE, Lambek R, Røssaak K, Egekvist AG, Marschall H, Forman A, et al. Health-related quality of life in women with endometriosis: psychometric validation of the Endometriosis Health Profile 30 questionnaire using confirmatory factor analysis. Hum Reprod Open. 2022;2022(1):hoab042.
29. Gater A, Taylor F, Seitz C, Gerlinger C, Wichmann K, Haberland C. Development and content validation of two new patient-reported outcome measures for endometriosis: the Endometriosis Symptom Diary (ESD) and Endometriosis Impact Scale (EIS). J Patient Rep Outcomes. 2020;4(1):13.
30. Armour M, Sinclair J, Ng CHM, Hyman MS, Lawson K, Smith CA, et al. Endometriosis and chronic pelvic pain have similar impact on women, but time to diagnosis is decreasing: an Australian survey. Sci Rep. 2020;10(1):16253.
31. Colombo GE, Makieva S, Somigliana E, Schoretsanitis G, Leeners B, Polli C, et al. The association between endometriosis and migraine: a systematic review and meta-analysis of observational studies. J Headache Pain. 2025;26(1):82.

### 5.5 Anxiety + depression overlay — comorbidity, somatic-symptom overlap, why standard scales over-diagnose in chronic illness

People with chronic illness keep getting told their physical symptoms are really anxiety — and the registry data shows how common that is, not because anyone set out to dismiss them, but because a short appointment with no long-term record often has little else to reach for. The Australian POTS registry put a number on it: 64.6% of patients had their symptoms attributed to anxiety before they were diagnosed [16, p. 159]. So when Neeve's engine adds a mood and anxiety overlay — and it has to, because depression and anxiety run alongside POTS, ME/CFS, endometriosis, migraine, and fibromyalgia at rates far above the general population — it has to do so without recreating the same mistake from the other direction. A chronically-ill person who is exhausted, sleeping badly, eating less, and unable to concentrate is not, on those grounds alone, depressed. They are chronically ill. The standard depression scales, particularly the PHQ-9 (a nine-question depression screener used widely in clinics), score positive on exactly those bodily items. Used as a verdict, they over-diagnose depression in this population. Neeve's job is to track mood and anxiety as a longitudinal comorbidity layer a clinician can read alongside physical symptoms — never as a label, never as a notification, and never with the bodily items collapsed into the thinking-and-feeling ones.

#### 5.5.1 The validated scales we use — PHQ-9 and GAD-7

The PHQ-9 is a nine-question depression check-in, with each answer scored from 0 to 3 over how the past fortnight has been; it is the scale doctors trust, which is why we use it as-is. It is built directly on the DSM-IV criteria for major depressive disorder (the standard clinical definition of clinical depression). Each item is scored 0 ("not at all") to 3 ("nearly every day") over a two-week recall window, total 0–27. Kroenke and Spitzer describe it as *"a dual-purpose instrument that, with the same nine items, can establish provisional depressive disorder diagnoses as well as grade depressive symptom severity"* [32, p. 1]. The cut-points are *"5, 10, 15, and 20 … for mild, moderate, moderately severe, and severe depression, respectively"* [32, p. 2]. At the most-used screening threshold, *"a PHQ-9 score of 10 or greater… has a sensitivity for major depression of 88%, a specificity of 88%, and a positive likelihood ratio of 7.1"* [32, p. 2]. The ninth item — *"thoughts that you would be better off dead or of hurting yourself in some way"* [32, p. 2] — is the question about suicidal thoughts and is treated separately by clinicians and (per §5.5.4) by Neeve.

The GAD-7 is the matched anxiety screener — seven questions, the same 0–3 answers over the same fortnight, total 0–21 — and it has been put through the same rigorous testing. Johnson and colleagues' psychometric study in a mixed psychiatric sample of 1,201 patients found Cronbach's α of 0.88 at intake (a measure of how consistently the seven questions hang together, where closer to 1 is better) and convergent validity against the Beck Anxiety Inventory, SCL-90 anxiety, and the Global Severity Index [33, p. 1]. ROC analysis — a way of finding the score that best separates people who have the condition from those who don't — identified the best operating cut-off: *"a sensitivity of 0.92 and a specificity of 0.7 for a cutoff of 8"* [33, p. 6].

Here is the point that decides how Neeve uses both scales: even the people who built and validated them say a cut-off is a flag for a clinician to look closer, not an answer. Johnson and colleagues are explicit that a cut-off is *"a threshold for identifying possible cases in which further questioning to determine the presence and type of anxiety disorder may be warranted"*, and that *"the GAD-7 should not be used to screen for GAD when there are clinical samples characterised by high general distress"* [33, p. 6]. The scales are screeners. They are not diagnoses. They generate a flag for a clinician to look at, never a label for the app to display.

Two facts about how these scales were validated bind the engine. Both were tested against a **two-week recall window** — *"Over the last 2 weeks, how often have you been bothered by any of the following problems?"* [32, p. 6]. They were not validated for momentary use, daily use, or repeated administration on shorter timescales. The Hall et al EMA review (§2) is explicit that copying a clinic questionnaire into a daily prompt breaks its validity. So PHQ-9 and GAD-7 belong on a periodic cadence — every fortnight, the window they were built for — not a daily one.

#### 5.5.2 The somatic-overlap problem

This is the part of the research that matters most for Neeve, and it is the heart of why these scales can mislead in chronic illness. The PHQ-9's nine items include four that are inherently about the body — sleep change (item 3), fatigue (item 4), appetite change (item 5), and psychomotor change, meaning moving or speaking noticeably slower or being restless (item 8) — and one (item 7, concentration) that crosses into the cognitive territory ME/CFS calls brain fog. In someone who is chronically ill but not depressed, several of those items can score positive every single day. A PHQ-9 total of 12 — moderate depression by the standard cut-points — can be reached from the four bodily items alone, before the person endorses a single thinking-or-feeling symptom.

Beswick and colleagues' multiple-sclerosis validation study is the cleanest illustration, and the finding is striking. Out of 103 community-dwelling people with MS, *"43% were categorised as depressed on at least one response"* [34, p. 1]. But when they checked what the score was really measuring, the result was unexpected. PHQ-9 totals were *"strongly positively correlated"* with the MS Impact Scale **physical** sub-score *"at the baseline time-point (r=0.86), and 4-week time-point (r=0.84)"* [34, p. 5] — a stronger link than the PHQ-9 had with the MSIS mental-health sub-score (r = 0.46 and r = 0.50). In plain terms: the depression score tracked the physical disease more tightly than it tracked mental health. The authors conclude, honestly: *"Evidence of divergent validity was not observed in our study"* [34, p. 6]. Their reading is the clinical one — mental and physical health are tightly coupled in chronic illness — but the methodological point is unavoidable: a PHQ-9 in a chronically-ill person is partly measuring their physical disease.

Patients in the same study could see the confound themselves, and said so plainly: *"Question 5 and 6 about depression doesn't allow for context which may affect the data you're collecting and your results. E.g. I am on medicine for depression but the depression is a result of fatigue"* [34, p. 6]. They can see it. They want the instrument to be able to see it too.

Yokoya and colleagues show the same problem from the whole-population angle, in a representative Japanese sample of 3,753 people. In their analysis, **fatigue and malaise was the single strongest bodily correlate of a PHQ-9 score of 10 or more**: *"presence of fatigue and malaise (OR = 1.7, 95% CI 1.3–2.4) was significantly associated with PHQ ≥ 10"* [35, p. 1]. (An odds ratio, OR, of 1.7 means those reporting fatigue and malaise were 1.7 times as likely to screen positive.) The pattern shifts with age: gastrointestinal complaints in 18–39 year-olds, fatigue and malaise from 40 onwards, extremity pain added in over-65s [35, p. 1]. The authors' summary is the line Neeve designs around:

> *"Age-related somatic symptom correlates of PHQ ≥ 10 differ across the lifespan. Predominantly gastrointestinal symptoms in younger patients, and generalized fatigue, malaise, and musculoskeletal pain in older groups were observed."* [35, p. 1]

The instrument cannot, on its own, tell the depression story apart from the chronic-illness story. The research offers three partial fixes. **Scoring the PHQ-9 without its bodily items** — Beswick cites Sjonnessen and colleagues, who *"found that scores were not altered by excluding items on fatigue and concentration"* [34, p. 2] in people with MS. **The PHQ-2**, an ultra-short two-question screen with *"a sensitivity for major depression of 83%, a specificity of 90%"* [32, p. 5] at a cut-off of 3 — which carries almost none of the bodily confound but loses the thinking-and-feeling texture clinicians need. **PROMIS Depression**, a scale that deliberately leaves out bodily items and is increasingly preferred in chronically-ill populations — Kroenke and colleagues validated the four-item PROMIS depression and anxiety scales in 244 primary-care patients with chronic pain and judged them *"reasonable options as ultra-brief measures for screening in patients with chronic pain"* [60, p. 1892], with an optimal screening cutpoint of 8 on the 4–20-point scale and a minimally important difference of ~2 points [60, p. 1892]. Neeve takes a fourth approach (§5.5.4): give the full PHQ-9 and GAD-7 on the cadence they were validated for, and separate the bodily items from the thinking-and-feeling items in the doctor PDF so the clinician can see exactly which items are driving the total.

#### 5.5.3 Prevalence — why this matters for Neeve's audience

Depression and anxiety are simply far more common in chronically-ill people, and the numbers make that plain. Khanal and colleagues' multi-disease study of 1,000 participants (800 with chronic illness, 200 healthy controls) found, across all chronic-illness cases, *"We found higher frequency of depression (31% vs 11%; p=<0.001) and anxiety (13.25% vs 6%; p=0.021) among cases as compared to healthy controls"* [36, p. 1]. *"We found higher levels of depression among participants with non-communicable diseases as compared to communicable diseases (37.25% vs 24.75%; p<0.05)"* [36, p. 1]. Among the non-communicable conditions, cancer ran highest at 67%, followed by diabetes 38%, cardiovascular 33% and respiratory 11% [36, p. 1]. And the authors describe a biological mechanism that matches how Neeve thinks about this — these aren't just a reaction to being unwell, they share physical roots:

> *"Chronic diseases and mental health disorders such as depression and anxiety are interconnected through shared inflammatory pathways that significantly impact both physical and psychological well-being. Pro-inflammatory cytokines affect critical biological systems associated with the pathophysiology of depression. Raised IL-1, IL-6, and TNF-alpha which are common in chronic conditions such as diabetes, have bidirectional relationship, affecting neurotransmitter functions and mood regulation."* [36, p. 3]

So in Neeve's audience, depression and anxiety are not separate problems bolted onto the physical illness. They are part of how the illness expresses itself, often through the body's own inflammation. The screening apparatus has to see them clearly without confusing them with the physical illness driving them.

#### 5.5.4 What the Neeve engine does

- **Periodic administration on the cadence the scales were validated for.** PHQ-9 and GAD-7 are administered **in full, every two weeks**, never daily. The two-week recall window is the basis of their psychometric validation [32, p. 6]; using them on shorter timescales breaks the instrument. The cadence matches the MS validation study's repeated-administration design (ICC 0.89, a measure of how consistently the scale reproduces a person's score across repeats) [34, p. 1].
- **Daily momentary tracking uses single 0–10 NRS items, not scale subsets.** Per the EMA architecture in §2, a single mood item and a single anxiety item sit in the core check-in. The single items track within-person trajectories; they are not standardised against population norms.
- **The engine surfaces trends with confidence labels — not verdicts.** *"Your mood ratings have trended lower over the past 14 days compared with your usual."* *"Your GAD-7 has moved from 6 to 11 across the last two administrations."* Trends are shown to user and clinician as patterns alongside ring-derived and symptom data, never as a diagnosis.
- **The engine never claims "depression detected" or "your anxiety is X" as a verdict.** Kroenke and Spitzer's description of the PHQ-9 as a tool that *"can establish provisional depressive disorder diagnoses"* [32, p. 1] is a clinical use case, not an app use case. Diagnosis is for the doctor.
- **The engine does not ping the user when they score high.** A high PHQ-9 or GAD-7 in a chronically-ill person frequently reflects bodily load, not crisis. *"You scored 14 — you may be depressed"* would be clinically unsafe and a textbook receptivity violation (§3). High scores are surfaced in the doctor PDF for clinician review, not used to trigger in-app interventions.
- **Suicidality item 9 is the only exception, and even there the engine does not diagnose.** If item 9 is endorsed at any non-zero level — *"thoughts that you would be better off dead or of hurting yourself in some way"* [32, p. 6] — the engine surfaces the standard crisis-support footer (Lifeline 13 11 14 in Australia, equivalent international references elsewhere). It does not interrupt, escalate, gamify, or push. Kroenke notes that *"nearly half of suicide victims have contact with a primary care provider within 1 month of suicide"* [32, p. 5] — the same rationale applies to the patient's longitudinal record.
- **The doctor PDF separates bodily from thinking-and-feeling items — and shows both.** This is the single most important engineering decision in §5.5. The PDF reports the PHQ-9 total and breaks it down: a somatic (bodily) sub-score (items 3 sleep, 4 fatigue, 5 appetite, 8 psychomotor) and a cognitive-affective (thinking-and-feeling) sub-score (items 1 anhedonia, 2 depressed mood, 6 worthlessness, 7 concentration, 9 suicidality), with concentration footnoted for the ME/CFS brain-fog overlap. The clinician sees, for example, "PHQ-9 total 12 — somatic sub-score 9, cognitive-affective sub-score 3" and can read that as somatic-driven, consistent with the patient's chronic illness, rather than as moderate depression requiring escalation. The same logic applies to GAD-7, where Johnson et al's factor-structure work identified items 4–6 (trouble relaxing, restless, irritable) as the bodily-symptom cluster requiring residual correlation in CFA [33, p. 4]: the PDF reports the GAD-7 total alongside a bodily-symptom sub-score and a cognitive-worry sub-score.
- **The user-facing surface is gentler than the doctor-facing one, deliberately.** The user does not see "PHQ-9 = 12, moderate depression". They see *"Your mood ratings have been lower than usual for the past two weeks. The check-in we use every fortnight scored higher this round. This is a pattern worth raising with your clinician."* The clinical numbers belong in the doctor PDF.

> **Evidence → product (anxiety + depression overlay summary)**
>
> **Evidence:** PHQ-9 validated at sensitivity 88% / specificity 88% for major depression at the ≥10 cut-off on a two-week recall window, not for momentary use [32, pp. 2, 6]; GAD-7 cut-offs are screening thresholds, not diagnostic labels [33, p. 6]; in chronic illness, PHQ-9 totals correlate more strongly with physical-disease severity (r = 0.86) than with mental-health sub-scores (r = 0.46) [34, p. 5]; fatigue and malaise is the strongest somatic correlate of PHQ-9 ≥ 10 in the general population (OR 1.7) [35, p. 1] — the same symptom that defines ME/CFS; depression runs at 31% and anxiety at 13% in chronic-illness populations vs 11% and 6% in controls [36, p. 1].
> **Product rule:** PHQ-9 and GAD-7 administered in full every two weeks — never daily. Daily mood and anxiety tracked as single 0–10 NRS items in the core check-in. Engine surfaces trends with confidence labels, never verdicts. No high-score pings. Item 9 suicidality surfaces a quiet, always-available crisis-support footer. The doctor PDF reports both scales as totals **and** as somatic vs cognitive-affective sub-scores so the clinician can read "PHQ-9 = 12 driven by somatic items" as consistent with the patient's chronic illness rather than as depression.
> **User-facing language:** *"Your mood ratings have been lower than your usual over the last two weeks. The check-in we use every fortnight scored higher this round. This is a pattern worth raising with your clinician."* Never *"depression detected"*.
> **Doctor-facing language:** *"PHQ-9 administered [date]: total [N]; somatic sub-score (items 3, 4, 5, 8) = X; cognitive-affective sub-score (items 1, 2, 6, 7, 9) = Y. GAD-7 administered [date]: total [N]; bodily-symptom sub-score (items 4, 5, 6) = X; cognitive-worry sub-score (items 1, 2, 3, 7) = Y. Trajectories over [W] weeks attached. Engine identifies possible patterns per Kroenke 2002 [32] and Johnson 2019 [33]; does not constitute diagnosis. Somatic-item overlap with underlying condition should be considered in interpretation per Beswick 2022 [34] and Yokoya 2018 [35]."*

**Bibliography**

32. Kroenke K, Spitzer RL. The PHQ-9: a new depression diagnostic and severity measure. Psychiatr Ann. 2002;32(9):509–15.

33. Johnson SU, Ulvenes PG, Øktedalen T, Hoffart A. Psychometric properties of the General Anxiety Disorder 7-item (GAD-7) scale in a heterogeneous psychiatric sample. Front Psychol. 2019;10:1713.

34. Beswick E, Quigley S, Macdonald P, Patrick S, Colville S, Chandran S, et al. The Patient Health Questionnaire (PHQ-9) as a tool to screen for depression in people with multiple sclerosis: a cross-sectional validation study. BMC Psychol. 2022;10(1):281.

35. Hoshino E, Ohde S, Rahman M, Takahashi O, Fukui T, Deshpande GA. Variation in somatic symptoms by patient health questionnaire-9 depression scores in a representative Japanese sample. BMC Public Health. 2018;18(1):1406.

36. Abbas U, Hussain N, Tanveer M, Laghari RN, Ahmed I, Rajper AB. Frequency and predictors of depression and anxiety in chronic illnesses: a multi disease study across non-communicable and communicable diseases. PLoS One. 2025;20(5):e0323126.

### 5.6 Fibromyalgia — diagnostic criteria, widespread pain index, cognitive + sleep overlap

Fibromyalgia is the "pain everywhere, plus exhaustion, plus a foggy head" sibling in the cluster of conditions Neeve serves. It overlaps heavily with POTS, ME/CFS, migraine and endometriosis — the same person often carries several at once. Like POTS, it has spent decades being misunderstood and routinely sent down the mental-health path before it gets named — not because clinicians don't want to help, but because there's no blood test or scan for it and a single appointment rarely shows the whole picture. The Neeve fibromyalgia engine does the same job as every other engine in §5: it tracks where the pain is across the body, the fibrofog, the sleep, and the autonomic overlap with POTS — and it never claims to diagnose. Diagnosis is a clinician's call. The engine's job is to make the long-term picture solid enough that the clinician has something real to work with.

#### 5.6.1 What fibromyalgia is — the ACR 2016 modified criteria

If you want to know what fibromyalgia actually is, the reference point is a checklist that has been refined four times over twenty-five years. The canonical source for fibromyalgia criteria is the 2016 revision of the 2010/2011 American College of Rheumatology criteria, authored by Wolfe and colleagues — the same group who built the 1990, 2010 and 2011 versions [37]. The 2016 revision consolidates the physician-based 2010 criteria and the self-report 2011 criteria into a single dual-purpose criteria set, valid for both clinical diagnosis and research classification. For a software product whose primary surface is a self-report check-in plus passive ring data, the 2016 modified criteria are the right reference point.

The 2016 modified criteria require all of the following:

> *"(1) Widespread pain index (WPI) ≥ 7 and symptom severity scale (SSS) score ≥ 5 OR WPI 4–6 and SSS score ≥ 9. (2) Generalized pain, defined as pain in at least 4 of 5 regions, must be present. Jaw, chest, and abdominal pain are not included in generalized pain definition. (3) Symptoms have been generally present for at least 3 months. (4) A diagnosis of fibromyalgia is valid irrespective of other diagnoses. A diagnosis of fibromyalgia does not exclude the presence of other clinically important illnesses."* [37, p. 326]

Four things in that text shape the engine. The **WPI** is simply a count of how many places on the body have hurt this week — *"note the number of areas in which the patient has had pain over the last week. In how many areas has the patient had pain? Score will be between 0 and 19"* [37, p. 326]. The 19 sites group into five regions: left upper, right upper, left lower, right lower, and axial. The **SSS** (symptom severity scale) rates three core symptoms — *"Fatigue, Waking unrefreshed, Cognitive symptoms"* — each on a 0–3 scale (*"0 = No problem … 3 = Severe: pervasive, continuous, life-disturbing problems"*) plus the presence over the prior six months of headache, lower-abdominal pain or cramps, and depression, each 0–1 [37, p. 326]. The **generalised pain criterion** — pain in at least 4 of 5 regions — was added in 2016 specifically so that pain confined to one area (like chronic pelvic pain or chronic low back pain) isn't mislabelled as fibromyalgia [37, p. 325]. And the **3-month duration** floor and the explicit *"irrespective of other diagnoses"* clause together mean fibromyalgia can sit alongside POTS, ME/CFS or endometriosis without one ruling the others out [37, p. 326].

There's one line in the same paper that decides how Neeve is allowed to behave. The self-report version *"is not valid for clinical diagnosis in individual patients but is valid for research studies"* [37, p. 320]. In plain terms: a version of this checklist that a person fills in themselves — which is exactly what a software product produces — is a screening and research tool, not a diagnosis. That single sentence is the whole reason the Neeve engine never says "Fibromyalgia detected".

#### 5.6.2 The validated impact PRO — FIQR

There's a difference between meeting the criteria and knowing how much fibromyalgia is actually wrecking someone's week — and there's a validated patient-reported outcome (a questionnaire the person fills in about their own experience) built for the second job. The Revised Fibromyalgia Impact Questionnaire (FIQR) is that instrument. It was developed by Bennett and colleagues in 2009 to fix known problems with the original FIQ — a complicated scoring algorithm, function questions written for a 1990s American household ("can you vacuum?", "can you use a washing machine?"), and the absence of items for memory, tenderness, balance and environmental sensitivity that fibromyalgia patients had since described as central to their experience [38, p. 2].

The FIQR has **21 questions across three linked domains**: function (9 items), overall impact (2 items), and symptoms (10 items) [38, p. 2]. All items are scored 0–10, all are anchored to *"the past 7 days"*, and the total score ranges 0–100. The 10 symptom items map almost one-to-one with what Neeve already asks daily — pain, energy, stiffness, sleep quality, depression, memory problems, anxiety, tenderness, balance, sensitivity to noise/lights/odours/cold [38, p. 3].

The numbers say it earns its place. In 202 fibromyalgia patients, *"the mean FIQR total score was 56.6 ± 19.9"*, with the Cronbach alpha for the full instrument at *"0.95, with item-total correlations ranging from 0.56 to 0.93"* [38, p. 6]. The FIQR correlated 0.88 with the original FIQ and discriminated fibromyalgia from rheumatoid arthritis / lupus (mean 28.6 ± 21.2) and from major depression (mean 17.3 ± 11.8) with the fibromyalgia mean of 56.6 ± 19.9 sitting clearly above both control groups [38, p. 5] — meaning it tells fibromyalgia apart from conditions it could be confused with. The item that scored highest in fibromyalgia patients was *"sleep quality"* at 7.61 ± 2.4 — the highest of all 21 items [38, p. 6]. And it's quick: patient completion time was *"1.3 minutes; scoring took about 1 minute"* [38, p. 1] — short enough that Neeve can administer it on a clinician-set cadence without burning the user's engagement budget.

**How Neeve uses the FIQR.** Administered at onboarding for users who tell us they have or suspect fibromyalgia, then on a clinician-set cadence (default: every 4 weeks). The total is never displayed as a verdict. It's shown as a trajectory in the doctor PDF, alongside the patient's daily WPI-based pain map.

#### 5.6.3 The self-report screen — FSQ / polysymptomatic distress

There's also a version of the criteria designed to be filled in entirely by the person themselves, with no examination needed. The Fibromyalgia Survey Questionnaire (FSQ) is that fully self-administered version of the ACR 2010 criteria, validated by Häuser and colleagues in a cross-sectional study of 1,651 patients with physician-diagnosed fibromyalgia [39]. It packages the **WPI** and the **SSS** into a single short instrument, and the sum is called the **Fibromyalgianess Scale (FS)**, also known as the **polysymptomatic distress (PSD) scale** [39, p. 1], with a total range of 0–31.

It lines up well with the older, examination-based standard. In 1,651 patients, *"1411 (85.5%) participants of the total sample met the FSDC of FMS"*, and in a 128-patient subsample where the ACR 1990 tender-point criteria were re-evaluated, *"the concordance rate of the FSDC and ACR 1990 criteria was 72.7%"* [39, p. 4]. The authors are explicit about where the wall sits: *"The FSDC are not be used for self-diagnosis or as substitute for a physician's diagnosis. The FSQ can be used to gather information about the key symptoms of FMS and the extent of somatic symptom reporting, but the interpretation and assessment of questionnaire validity belongs to the physician"* [39, p. 5]. That sentence sets the wall the Neeve engine sits behind — the engine gathers the picture; the doctor interprets it.

#### 5.6.4 Autonomic dysfunction + POTS overlap

Here's the part that explains why fibromyalgia and POTS keep turning up in the same person. The autonomic nervous system — the automatic controls for heart rate, blood pressure and the body's response to standing — is often out of balance in fibromyalgia, and two papers in our reading make that case directly. Kang and colleagues compared 16 fibromyalgia patients with 16 controls and found that *"Patients with fibromyalgia had significantly higher SDNN/RMSSD values under both normal quiet breathing and rate controlled breathing compared to controls. Differences between the longest and shortest R-R interval under Valsalva maneuver were also significantly lower in patients with fibromyalgia than in controls"* [40, p. 301]. They name the physiology: *"patients with fibromyalgia present with blunted sympathetic vascular modulation and impaired cardiac vagal withdrawal to gravitational stress, and consequently reduced orthostatic tolerance"* [40, pp. 302, 305]. That last clause — reduced ability to tolerate standing — is the bridge to POTS.

Yagiz On and colleagues went further, testing 29 drug-free female fibromyalgia patients against 20 controls with Valsalva and tilt manoeuvres [41]: *"FM patients were found to have ANS dysfunction characterized by increased sympathetic response and decreased parasympathetic response"* [41, p. 327]. They add the link to severity: *"sympathetic activity, as measured with SSR amplitudes was found to be associated with the severity of FM"* [41, p. 332] — the more the autonomic system is dysregulated, the worse the fibromyalgia. The same paper notes that *"a recent meta-analysis reported that the pooled prevalence of SFN [small fibre neuropathy] in FM was 49% with moderate heterogeneity"* [41, p. 333].

The plain reading: in a large fraction of patients, fibromyalgia is an autonomically dysregulated condition with a measurable heart-rate-variability signature, a measurable failure to adapt to standing, and meaningful overlap with the small-fibre nerve damage that may underlie POTS in some of the same people. So the fibromyalgia engine cross-references its signals with the POTS engine, surfacing the autonomic-overlap pattern as a single picture rather than two unrelated alerts.

#### 5.6.5 What the Neeve fibromyalgia engine does

- **Ring measures passively that's useful:** resting heart rate, HRV (heart-rate variability, used here as a proxy for the balance between the body's accelerator and brake, aligned with the SDNN/RMSSD literature [40]), sleep architecture and sleep fragmentation (the FIQR's top-scoring symptom is sleep quality at 7.61 ± 2.4 [38, p. 6]), activity load against the user's rolling baseline, and orthostatic-pattern events shared with the §5.1 POTS engine.
- **User must self-report:** multi-site daily pain captured against the WPI's 19 body regions [37, p. 326] — Neeve's body map IS the WPI body map, so daily pain logging accumulates into a 7-day WPI count without an extra survey; fatigue, fog and felt sleep quality on the same 0–10 NRS the rest of the app uses; stiffness and tenderness when present; the consolidated "anything to add" free-text field per §2; and the **FIQR every 4 weeks** as the periodic reflective check-in.
- **Ring cannot know:** tender-point sensitivity [37, p. 320]; the subjective quality of pain (burning, lancinating — the neuropathic-pain features [41, p. 333]); medication efficacy; and the load of comorbid mental health, life stress, or trauma.
- **Engine surfaces, with confidence labels:**
  - *"Your widespread-pain map has been [increasing / steady / decreasing] over the last [N] weeks. Today's count: pain in [X] regions."*
  - *"Sleep efficiency from the ring has been [up / down / steady] this week; felt sleep quality on your check-ins has been [up / down / steady]."* The two are always shown side by side — the gap between how well the ring says you slept and how rested you actually felt is itself a fibromyalgia signal, per the FIQR sleep item [38, p. 6].
  - *"Heart rate variability has trended [down / up / steady] vs your 14-day baseline."* Framed against the user's own baseline.
  - *"A POTS-pattern candidate appeared alongside your fibromyalgia-pattern data this week — these conditions often co-occur."* Engine cross-reference, surfaced only when both engines have qualifying events.
- **Engine NEVER claims:** "Fibromyalgia detected." "You have fibromyalgia." "Your fibromyalgia is flaring." "Your sympathetic nervous system is overactive." The self-report version of the criteria *"is not valid for clinical diagnosis in individual patients"* [37, p. 320], and the FSQ authors are explicit that *"the interpretation and assessment of questionnaire validity belongs to the physician"* [39, p. 5].

> **Evidence → product (fibromyalgia engine summary)**
>
> **Evidence:** The ACR 2016 modified criteria require WPI ≥ 7 + SSS ≥ 5 (or WPI 4–6 + SSS ≥ 9), generalised pain in 4 of 5 regions, and symptoms ≥ 3 months — explicitly valid *"irrespective of other diagnoses"* [37, p. 326]; the self-report version is *"not valid for clinical diagnosis in individual patients"* [37, p. 320]. The FIQR is a validated 21-item PRO, 0–100 total, with sleep quality scoring highest among fibromyalgia patients (7.61 ± 2.4) [38, p. 6]. The FSQ self-report criteria show 72.7% concordance with the 1990 ACR criteria in a 128-patient validation subsample [39, p. 4]. Fibromyalgia patients show sympathetic hyperactivity and parasympathetic hypoactivity on HRV [40, p. 301], with reduced Valsalva and tilt RRIVs indicating *"reduced orthostatic tolerance"* [40, p. 302] and SSR amplitudes correlating with disease severity [41, p. 327].
> **Product rule:** One engine for fibromyalgia, sharing autonomic signals with the POTS engine (§5.1) and fatigue/PEM signals with the ME/CFS engine (§5.2). Daily WPI body map accumulates a 7-day WPI count without an extra survey. FIQR administered at onboarding and every 4 weeks. FSQ Fibromyalgianess Scale tracked as a research-grade polysymptomatic distress trend, never as a diagnostic verdict. Engine surfaces widespread-pain trajectory, sleep efficiency vs felt sleep quality, autonomic trend, and POTS-overlap candidates with confidence labels. The engine never claims diagnosis.
> **User-facing language:** *"Your widespread-pain map has been steady over the last 4 weeks. Sleep felt less restorative this week even though sleep duration was similar — a pattern worth noticing."*
> **Doctor-facing language:** *"Patient-reported widespread pain index (WPI) over [W] weeks: median [X] regions (range [Y–Z]). Symptom severity scale (SSS): fatigue [score], waking unrefreshed [score], cognitive symptoms [score]. Fibromyalgianess Scale (Wolfe FSQ) total [score]. FIQR total at last administration [score] (date), trend over [N] administrations [direction]. Autonomic context (ring-derived): resting HR [bpm], HRV [ms], orthostatic-pattern events [N] over [W] weeks (cross-referenced with §5.1). Engine identifies possible fibromyalgia patterns per Wolfe 2016 modified ACR criteria [37] and Häuser FSQ [39]; does not constitute diagnosis. Self-report version of criteria not valid for individual clinical diagnosis per Wolfe et al [37, p. 320]."*

### 5.7 ADHD overlay — undiagnosed adult attention regulation, executive function, and chronic-illness comorbidity

ADHD here is an overlay, not a main engine — it runs quietly alongside whatever else a person is carrying. It sits next to the anxiety and depression overlay in §5.5 for the same reason: it shows up as a common companion to the chronic illnesses Neeve is built for, and it lands hardest on women and on adults who only get diagnosed in their 30s and 40s — the very people who have spent years being told that their POTS, ME/CFS, fibromyalgia or endometriosis was anxiety or stress. The good news is we don't have to ask them to do anything new. The patterns Neeve already collects line up with what an ADHD assessment looks for: morning clarity and focus from the check-in, how long it takes to fall asleep and how broken that sleep is from the ring, and the shape of HRV and autonomic activity across the day. The engine surfaces those patterns with confidence labels. It never tells a user they have ADHD. Diagnosis sits with the psychiatrist — and in Australia that pathway is genuinely hard to walk, a structural problem the doctor PDF is built to help shorten, not to replace.

#### 5.7.1 What adult ADHD actually looks like

Adult ADHD is a lifelong condition that starts in childhood, marked by trouble holding attention, restlessness, and acting on impulse — defined in DSM-5 by inattention, hyperactivity and impulsivity, and present in about 2.8% of adults across countries [53, p. 2]. Two findings shape how Neeve thinks about it. First, the adult picture is wider than the textbook checklist — emotional regulation and how well a person can plan and follow through are part of the core, not optional extras. Brevik and colleagues validated screening tools in 646 adults who had been clinically diagnosed and 908 controls in Norway, and found that *"the WURS had even better screening properties than the ASRS, in spite of our sample being clinically assessed and diagnosed in adulthood. The wider WURS dimensions of aggression, learning problems and emotional lability were highly relevant to identify adult ADHD in our sample, supporting a broader conceptualization of ADHD"* [53, p. 8]. Second, adult ADHD comes in degrees rather than a clean yes/no — symptoms sit on a spectrum that blends into ordinary variation. The same paper notes that *"the delineation of disorder versus normality is a universal problem when a diagnosis is based on symptoms that are dimensional and normally distributed, and it is of particular concern in a disorder for which controlled stimulant substances with potential for abuse are first-line treatments"* [53, p. 7]. That is exactly why the engine stays in its lane: tracking those graded symptoms over time can describe a pattern, but it cannot draw the line between "has ADHD" and "doesn't".

#### 5.7.2 The validated scales we use — ASRS-v1.1

The tool Neeve leans on is the Adult ADHD Self-Report Scale (ASRS-v1.1), the World Health Organization's screening questionnaire. The full version is 18 questions mapped to the DSM symptoms, each answered on a 5-point scale (0 never → 4 very often) for a total range of 0–72. In practice most people use the shorter 6-item screener. Brevik and colleagues tested both and found *"an AUC of 0.956 (95% CI: 0.946–0.965) for the WURS, and 0.904 (95% CI: 0.888–0.921) for the ASRS. The ASRS short screener had an AUC of 0.903 (95%CI: 0.886–0.920)"* [53, p. 1] — AUC being a measure of how well a test separates people who have the condition from those who don't, where 1.0 is perfect. The headline for us: the 6-item screener sorted people about as well as the full 18 items. At a cut-off of 35 on the full ASRS, the paper reports *"a sensitivity of 0.80 and specificity of 0.88 for the ASRS"* [53, p. 4] — it correctly flags 80% of those with ADHD and correctly clears 88% of those without. The expected two groupings of symptoms (inattentive, and hyperactive/impulsive) held up, together explaining 62.2% of the variance [53, p. 6].

The paper is also clear-eyed about what the ASRS is for, and we follow that line exactly. The authors call it *"a brief screening instrument to identify current ADHD symptoms"* [53, p. 3] — a way to decide who should get a proper assessment, not the assessment itself. In the Norwegian study, the adults who counted as having ADHD had to meet ICD-10 / DSM criteria through clinical assessment by experienced psychiatrists and psychologists [53, p. 3]; the screener chose who got that assessment, it didn't replace it. That distinction is the wall the Neeve engine sits behind.

A second point from the same paper sets how often we ask. The ASRS can be *"affected by short-term confounders such as affective fluctuations… time of day… and sleep problems"* [53, p. 8] — meaning a bad mood, the hour of day, or a poor night's sleep can all nudge the answers. Asking it every day would invite exactly those distortions. So the Neeve engine gives the 6-item ASRS at onboarding for users who tell us ADHD is on their list of possibilities, then every 4–8 weeks. It is not a daily probe.

#### 5.7.3 The chronic-illness overlap

ADHD turns up in the chronic-illness population far more often than chance would explain, and that is the reason this overlay exists. Kustow's 2025 review of the bodily-comorbidity cluster — the group of physical conditions that travel together — puts the link plainly: *"Emerging research reveals a striking overlap between ADHD, hypermobility syndromes, immune dysfunction, and autonomic dysregulation. Studies suggest that approximately half of individuals with ADHD are hypermobile, while ADHD is significantly over-represented in those with hypermobility syndromes, such as Hypermobile Ehlers-Danlos Syndrome (hEDS) and Hypermobility Spectrum Disorder (HSD)"* [54, p. S54]. The same review names the exact cluster Neeve already serves: *"This 'somatic super-syndrome' encompasses many of ADHD's under-recognised somatic comorbidities, including hypermobility, allergy and autoimmunity, POTS, fatigue and pain syndromes (Chronic Fatigue Syndrome and Fibromyalgia Syndrome), and sensory processing issues"* [54, p. S54]. POTS, ME/CFS, fibromyalgia — the §5.1, §5.2, §5.6 engines — sit inside that cluster. ADHD is part of how the cluster shows itself in a sizeable subgroup of patients.

Sleep and the body clock are the other half of the overlap. Luu and Fabiano's 2025 review reports that *"insomnia and sleep disturbances affect up to 80% of adults with ADHD and similarly up to 82% of children with ADHD, delayed sleep-wake timing occurs in up to 78%, and dim-light melatonin onset (DLMO) is delayed by approximately 45 minutes in children and 90 minutes in adults"* [55, p. 1] — dim-light melatonin onset being the evening point when the body starts releasing the hormone that brings on sleep, here arriving late. The same paper describes *"phase delays of melatonin… in children and adults identified to have a delayed onset of about 45 minutes and 90 minutes, respectively"* [55, p. 2] and *"blunted and delayed cortisol rhythms"* with *"lower basal cortisol levels, particularly in the morning, compared to controls"* [55, p. 2] — cortisol being the morning stress hormone that normally helps a person wake up and get going. These are precisely the signals the Neeve Ring already captures without anyone lifting a finger — how long it takes to fall asleep, how broken the sleep is, and HR/HRV across the day. The ring cannot diagnose anything. But this late-clock pattern shows up in the ring trace as later sleep onset, lower morning HRV, and a flatter morning-clarity curve in the check-in, and the engine surfaces that as a pattern worth taking to a clinician.

The third overlap is the one where women keep getting missed. Attoe and Climie's 2023 systematic review of adult ADHD in women, drawing on eight studies, notes that *"in childhood, the ratio of boys to girls with ADHD is about 3:1 whereas in adulthood it is closer to 1:1, suggesting that women and girls are underdiagnosed in childhood"* [56, p. 645]. The reason isn't anyone's bad faith — it's that girls tend to present in ways the system was never tuned to catch: *"girls are more often diagnosed with ADHD-Inattentive (ADHD-I), exhibiting symptoms such as distraction, disorganization, and forgetfulness. Boys more frequently present with ADHD-Hyperactivity/Impulsivity (ADHD-HI)… These symptoms are often more disruptive in the classroom setting, leading to higher rates of referral for assessment in boys than girls"* [56, p. 646]. The downstream effect is what brings these women into Neeve's audience, and it is a structural tangle, not a failure of any one doctor: *"Many women seeking treatment for mood and emotional problems may have unrecognized ADHD… Higher rates of comorbidities such as depression and eating disorders in females with ADHD may make diagnosis more difficult. As well, physicians may have more difficulty separating ADHD from its comorbidities, potentially clouding ADHD symptoms and leading to delayed diagnosis in females"* [56, p. 646]. The review records what that feels like from the patient's side: *"For many women, ADHD falls under the category of 'illnesses you have to fight to get'… Women often feel they need to prove symptoms for a physician to take them seriously and consider a diagnosis of ADHD"* [56, p. 647]. It is the same pattern §1 describes the system inflicting on chronic-illness patients more broadly — and the same answer applies: give the clinician something solid to work with.

#### 5.7.4 Australian diagnostic context

In Australia, getting an adult ADHD diagnosis means going private, which is slow and expensive — and that's a system problem, not a clinician one. Bradlow, Armstrong and Ogden's 2025 MJA perspective sets it out: *"Most adults with ADHD are diagnosed by private psychiatrists. The dearth of public services for ADHD raises serious concerns regarding equity of access and the potential that normal behavioural variability is 'medicalised'"* [57, p. 384]. The cost wall is blunt: *"The private model of ADHD diagnosis and treatment in Australia means that patients are often obliged to pay thousands of dollars and spend time on waiting lists before they can be assessed. This system selects out the people who have the financial capacity to afford the high medical costs and who possess the patience and organisational skills to navigate the complicated system, possibly excluding people who do not have the means to access private psychiatry"* [57, p. 384]. The same paper names the cruel loop the chronic-illness audience walks straight into: *"the impairments caused by untreated ADHD — particularly financial instability and poor executive functioning — make it more difficult for affected individuals to navigate the complex and costly process required to obtain a formal diagnosis"* [57, p. 384].

The waits are real and measurable. Mendonsa and Jayasooriya's 2025 audit of a private Australian clinic looked at 68 patients referred between January 2023 and October 2024, where *"wait times ranged from 10 days to 305 days, with a mean wait time of approximately 4 months (112 days). Almost 30% of the patients referred had wait time of more than 4 months"* [58, p. S792]. The group was close to gender-balanced (33 male, 35 female), aged 17–56, and *"nearly all patients received their ADHD diagnosis in adulthood, with less than 5% having a childhood ADHD diagnosis"* [58, p. S792]. The picture matches the literature on adult women: diagnosis comes late, in adulthood, after the chronic-illness picture has already formed. The lesson is the one §1 has already drawn — through all those referrals and specialists, the patient is the only constant in their own care, and a portable, structured record is what shortens the road to the right clinician.

#### 5.7.5 What the Neeve ADHD-overlay engine does

- **Ring measures passively, on the cadence Neeve already runs.** How long it takes to fall asleep, how broken the sleep is, HRV trends across the day, activity patterns (restlessness, irregular bursts), and a time-of-day cognitive proxy drawn from the shape of HR variability. These map onto the late-body-clock picture Luu and Fabiano describe [55, p. 1]. No new sensor work is required; the ADHD overlay reads the same stream the POTS and ME/CFS engines read.
- **User self-reports use the core check-in, not a parallel ADHD diary.** Morning clarity, fog level, focus, and the consolidated *"anything to add"* free-text field are already in the daily check-in (§2). For users who turn on the ADHD overlay, a small set of optional questions adds time-blindness moments, hyperfocus episodes, and *"anything you got stuck on today"* — all on the existing 0–10 NRS plus free-text, all subject to the same receptivity gating (§3) as every other probe.
- **The ASRS-v1.1 6-item screener is administered on a screener cadence, not a daily one.** Onboarding for users who flag ADHD as something they want to track, then every 4–8 weeks. The total is shown to the user as a single number against the published reference line. The engine never administers the ASRS daily; Brevik and colleagues' note that the ASRS may be *"affected by short-term confounders such as affective fluctuations, time of day and sleep problems"* [53, p. 8] is the reason.
- **The ring cannot know subjective ADHD symptoms.** It cannot tell hyperfocus from flow, it cannot see rejection-sensitivity dysphoria (RSD) episodes, it cannot read medication state, and it cannot distinguish the inattentive presentation from a bad fatigue day in an ME/CFS patient. The self-report items carry that information; the ring contextualises.
- **The engine surfaces with confidence labels, never verdicts.** Clarity-and-focus trajectory by time of day. Sleep-onset-latency trend. ASRS scores against the published cut-off shown as a reference line on the trajectory chart, with confidence labelled tentative / moderate / strong per the §6.3 convention.
- **The engine never claims "ADHD detected" or "you have ADHD".** Diagnosis requires DIVA-5 or equivalent psychiatrist-administered clinical interview. The ASRS is a screener; Brevik and colleagues describe it as *"a brief screening instrument to identify current ADHD symptoms"* [53, p. 3] and their own diagnosed sample required a comprehensive clinical assessment to enter the registry [53, p. 3]. The Neeve user-facing surface uses the §5.5 pattern: *"Your morning clarity is consistently lower than your evening clarity. That pattern is worth noticing."* It does not say "ADHD likely".
- **The doctor PDF shows the pattern alongside the chronic-illness picture.** ASRS score and date, with the published cut-off as a reference line. Morning vs evening cognitive-clarity median over the report window. Sleep-onset-latency and fragmentation trend. A line cross-referencing §5.1 (POTS overlap) and §5.2 (ME/CFS fatigue overlap) where the engines are running in parallel. The clinician reads the ADHD-overlay page next to the POTS page next to the ME/CFS page — that adjacency is the point.
- **Key product behaviour for the audience this section is written for.** When a user has a positive ASRS, a chronic-illness picture already running in other engines, and the late-diagnosis-in-Australia demographic profile (typically women in their 30s–40s telling us for years they've been told it's anxiety or stress), the doctor PDF's "questions to ask" section surfaces *"given the chronic-illness picture, should ASRS and an adult ADHD assessment referral also be on the table?"* — as a question for the GP, never as the engine's answer. Bradlow and colleagues note that *"the impairments caused by untreated ADHD… make it more difficult for affected individuals to navigate the complex and costly process required to obtain a formal diagnosis"* [57, p. 384]; the PDF's job is to shorten that road by handing the GP a structured pattern they can act on, working with the clinician rather than around them.

> **Evidence → product (ADHD overlay summary)**
>
> **Evidence:** The ASRS-v1.1 6-item screener works as a valid screen, with AUC 0.903 (95% CI 0.886–0.920) in a Norwegian clinical-registry sample of 646 diagnosed adults and 908 controls — but its authors classify it as *"a brief screening instrument"*, not a diagnostic one [53, pp. 1, 3]. ADHD runs through the chronic-illness cluster Neeve serves — *"approximately half of individuals with ADHD are hypermobile"* and the cluster extends to POTS, ME/CFS, fibromyalgia and mast-cell activation [54, p. S54]. Sleep and circadian disturbance affect up to 80% of adults with ADHD and DLMO is delayed by ~90 minutes [55, p. 1]. Women are systematically under-diagnosed in childhood and arrive at diagnosis in adulthood after their physical-illness picture has been mistaken for anxiety [56, pp. 645–647]. In Australia, the diagnostic pathway is private-only, with mean wait time ~4 months and ~30% waiting longer than 4 months [57, p. 384; 58, p. S792].
> **Product rule:** ADHD-overlay engine, not primary engine. Same architecture as §5.5 anxiety overlay. ASRS-v1.1 6-item screener administered at onboarding and every 4–8 weeks for opted-in users — never daily. Ring data and check-in data already collected; no parallel ADHD diary. Engine surfaces clarity-by-time-of-day, sleep-onset-latency, and ASRS trajectory with confidence labels, never verdicts. The engine never claims ADHD diagnosis. The doctor PDF surfaces the ASRS score against the published cut-off, the cognitive-clarity pattern, and a "questions to ask" line for the GP referral conversation — particularly for users sitting in the late-diagnosis-in-Australia demographic the literature describes.
> **User-facing language:** *"Your morning clarity is consistently lower than your evening clarity. That pattern is worth noticing. The ASRS-v1.1 is a 6-question screener many people use to start the ADHD conversation with their GP — want to fill it in this week?"* Never *"ADHD detected"* or *"you have ADHD"*.
> **Doctor-facing language:** *"ASRS-v1.1 administered [date], score [X] of 24. Per Kessler 2005 cut-off (≥4 of 6 darkened squares), score consistent with [positive/negative] screen for adult ADHD. Cognitive clarity by time of day over [W] weeks: morning median [X], evening median [Y]. Sleep onset latency mean [X] min, fragmentation index [Y]. Engine identifies possible patterns per ASRS criteria and per Luu & Fabiano 2025 circadian phenotype [55]; does not constitute diagnosis. DIVA-5 or equivalent clinical interview recommended for diagnostic assessment per Brevik 2020 [53]. Chronic-illness comorbidity context (POTS / ME/CFS / fibromyalgia overlap per Kustow 2025 [54]) and demographic context (late-diagnosis pattern per Attoe 2023 [56]) attached as supporting reference."*

---

---

## 6. What patients see — the dignity layer

The dignity layer is the patient-facing equivalent of the doctor PDF in §7. The PDF is structured for a clinician's eye. The dignity layer is structured for a tired person's. Both serve the same goal — give the patient credibility they can carry into a room where they haven't always been heard. This section is the spec for the voice Alys uses, the way the Today screen presents observations, what confidence labels mean, how the app handles a bad day, and what we never do regardless of how engaging the alternative would be.

### 6.1 What the patient brings to the screen

Someone who has been failed by the medical system once doesn't open a new health app with a fresh face. They open it on guard. They've been told their symptoms are stress (§1). They've been told their reports aren't data and that the absence of data means their illness isn't real [2, p. 1337]. They've been told to wait for symptoms to be severe enough that they can no longer be ignored before help is offered [3, p. 2]. Three different studies in §1 made the same point from three angles: chronically-ill people, and especially chronically-ill women, hold real knowledge of their own bodies, and the systems built to help them are bad at receiving it.

Neeve's dignity layer is the place that has to demonstrate, in the first interaction, that this app is different. Not through a manifesto, not through a "welcome to your wellness journey" splash, but through how it speaks and what it refuses to claim. The proof is structural: it shows up in word choice, in what gets surfaced and what stays quiet, in whether the user is the scientist or the patient.

### 6.2 The voice — warm + cited + invitational

The voice rule, locked from §8 and the binding feedback memories. Three structural elements every observation follows:

1. **Population-cited research, not personal diagnosis.** *"Caffeine bumps sympathetic activation in most people"* is fine. *"Caffeine is causing your anxiety"* is not. The first cites a general body of evidence the user can verify; the second makes a causal claim about a specific person, which Neeve is not credentialed to make and which TGA would not let us ship.
2. **Within-person observation, not population norms.** Comparison is always against the user's own baseline — *"your HRV has been lower than your usual range"* — never against a population mean unless a published clinical cut-off exists (orthostatic ΔHR ≥30 bpm; MAPS ≥42; DSQ-PEM substantial-severe). Within-person framing is what the EMA literature in §2 supports and what the doctor PDF in §7 inherits.
3. **Invitation to experiment, not prescription.** *"Want to try halving caffeine for a week and let your check-ins and HRV be the judge?"* is the right shape. *"Cut your caffeine"* is the wrong shape. The user is the scientist; the app is the lab notebook; the user's own data is the verdict. This pattern is what every credentialed wellness app uses to stay inside the wellness line — it preserves agency, sidesteps prescriptive claims, and makes the data the protagonist rather than the algorithm.

The voice is warm. Direct acknowledgments like *"that's a lot"* or *"that's a real thing"* are allowed — they're not clinical claims, they're being a human. The voice is also brief. Sentences are short. Words are plain. A chronically-ill person reading this is brain-fogged, exhausted, and has been talked down to by the medical system; the app does not add to the cognitive load.

### 6.3 Confidence labels, not scores

The single most important refusal in the dignity layer is the refusal to produce an aggregate score. Neeve never displays a wellness score, a daily rating, a "you're at 73% today", or any composite that compresses a person's lived experience into a single number. The reason is structural: chronic illness is not a number, and the people who built scores into wellness apps built them for healthy users who get a dopamine hit from green. For chronic illness, a low score is one more piece of evidence the body is failing — and the user already knows that.

Instead the app uses **confidence labels per engine**. Each pattern surfaced carries one of three labels:

- **Tentative** — early days, sparse data, contradicting signals. Surface the pattern but say so. *"Tentative pattern — only 4 days of data and your sleep tracking has gaps."*
- **Moderate** — pattern is consistent enough across enough days to talk about, but the engine wants more. *"Your HRV has been in your low band for 8 of the last 14 days — moderate confidence in the pattern."*
- **Strong** — sustained pattern, multi-source agreement, clear within-person divergence from baseline. *"Strong pattern — every Tuesday after work for the last 5 weeks your evening anxiety has been at 8+/10 and your morning fatigue has spiked the next day."*

Confidence labels are honest about what the app does and doesn't know. They're also kinder than scores — a strong pattern with bad numbers is a real picture the user can show their doctor; a daily score of 31% is just a punch in the gut.

### 6.4 No streaks, no gamification, no encouragement copy

Neeve does not have streaks, badges, levels, milestones, "your best week ever", "X days in a row", or any other mechanism designed to drive engagement through reward. This is binding per the brand identity and the design brief, and it's also a clinical commitment.

The reason is that streaks and gamification work the opposite way around for the audience Neeve is built for. A chronically-ill user has bad weeks. A streak breaks on a bad week. The streak break punishes the user for being sick. The mechanism is structurally cruel for this population, and every chronically-ill user who has tried a streak-based app has felt the bite of it. Neeve refuses to participate.

What replaces them: **continuity is shown, not gamified**. The app might say *"You've logged check-ins on 18 of the last 30 days — that's enough data for the engines to find patterns."* It might say *"You missed yesterday — that's fine; here's where to pick up."* It does not say *"You broke your streak"* or *"3 days to your next milestone"* or *"You're doing amazing!"*. The user does not need a cheerleader. They need someone who sees what's actually there.

### 6.5 How Alys speaks

Alys is the named observational presence in the app. She is not a chatbot. She is not a coach. She is not a wellness influencer. She is a quiet, dignified presence who reads the user's own data and check-ins back to them with care, and who has the institutional memory of the engines and the foundations doc behind her.

Alys's speech rules:

- **She quotes the user back to themselves verbatim.** When the user wrote *"just life is very overwhelming at the moment"* on a Wednesday, Alys can say the next morning *"You wrote that life is very overwhelming yesterday. Your sleep was 7.5 hours, but morning anxiety is at 8."* That's reflection, not interpretation.
- **She names body states, not conditions.** *"Your body has been running hard this week — sympathetic load high, HRV low, gut uncomfortable most evenings."* She does not say *"this looks like burnout"* or *"this is anxiety"*. The doctor names the condition.
- **She uses the observation → reflection → invitation pattern.** Observation: what the data shows. Reflection: what the user wrote in their own words. Invitation: a question, an experiment, a thing worth bringing to the doctor.
- **She is willing to stay silent.** Per the JITAI architecture in §3, the default action when a person isn't receptive — asleep, mid-crash, just dismissed a probe — is to surface nothing. Alys does not chase engagement.
- **She is honest about uncertainty.** When data is thin, she says so. When confidence is tentative, she labels it. When something looks like one thing in the data but the user reports another, the user's report wins (felt-experience-primary).
- **She does not produce verdicts.** No diagnosis. No prediction. No "you should". No score.

A short example of Alys at work, in voice, on an anonymised example day:

> *"You've been at 8+/10 anxiety on 5 of the last 7 days, and you wrote three times that you can't shut off. Your HRV has stayed low and flat for two weeks — the pattern bodies show when the sympathetic nervous system stays on. Mild post-exertional fatigue 5 mornings in a row, not severe, but a pattern. The caregiving load and work stress you wrote about are showing up in the data. Worth talking to your GP about. If you want to test one thing this week without waiting for an appointment, halving the caffeine and seeing what your HRV does is a clean experiment."*

That's the full voice in one paragraph: observation, reflection (verbatim), body-state language, named life context, doctor redirect, single-experiment invitation. No diagnosis, no score, no prescription.

### 6.6 The bad-day dignity pass

When the data shows a bad day, the app does not pretend it's fine and does not make it worse. The bad-day dignity pass is a binding behavioural rule:

- **The bad day is shown, not hidden.** Pain at 9, fatigue at 9, multiple panic episodes — these appear on the Today screen and in the trajectory. The user knows what their data is and does not need it sanitised. Hiding bad days is also clinically harmful — the doctor PDF needs the bad days.
- **The bad day is named, not cheerleaded over.** *"Today was rough — pain 9, fatigue 9, you wrote 'I couldn't function'. Saving it to the record."* Not *"Don't worry, tomorrow is a new day!"*. The first respects the user; the second talks past them.
- **The bad day does not earn a "try this!" prompt.** No experiment invitations on bad days. Alys stays quiet or says only what she has to. Receptivity gating (§3) routes the engines to *provide nothing* when the user is clearly not in a place to absorb anything.
- **The bad day does not break a streak, because there are no streaks.**
- **The bad day always has the consolidated *"anything to add"* free-text field available** for the user to speak in their own voice. Those words are what go into the doctor PDF section 5 verbatim — patient voice as data.

### 6.7 Felt experience is primary

The binding rule from `feedback-felt-experience-primary.md`. The four core check-in items (pain, fatigue, fog, *"anything off?"*) are asked every check-in, every day, regardless of what the ring shows or what the engines flag. The reason is that the gap between *"ring shows you're fine"* and *"I feel terrible"* is the most diagnostic signal in the system. If we only ask the felt-experience questions when the ring flags something, we recreate exactly the dismissal pattern §1 documents the medical system inflicting on this population — *"we don't see anything wrong with you, so there isn't anything wrong."*

In practice this means: the ring is the silent witness; the check-in is the primary record; engines combine both with the check-in weighted higher when they diverge. Every engine spec in §5 reflects this. The doctor PDF in §7 leads with the patient's own-words section, not the ring trace.

### 6.8 What the dignity layer never does

Pulling the refusals together so they're easy to point at in design review:

- Never displays an aggregate score (wellness %, daily rating, etc.)
- Never uses streaks, badges, levels, milestones, or any gamified-engagement mechanism
- Never says *"you're doing great"*, *"keep it up"*, *"you've got this"*, or any cheerleader copy
- Never says *"X detected"*, *"X likely"*, *"X confirmed"*, *"X predicted"* — see §10 Regulatory Boundary
- Never compares the user to a population norm unless a published clinical cut-off exists
- Never paraphrases what the user wrote in their own words — quotes are verbatim
- Never produces a probe when receptivity gating says *provide nothing*
- Never escalates engagement (no "you haven't checked in for X days!" reminders)
- Never sells, surfaces, or recommends a product or service
- Never offers diagnosis, prescription, prediction, or specialist referral advice

> **Evidence → product (Dignity layer summary)**
>
> **Evidence:** Patients with chronic illness arrive at any new health interaction already disbelieved [1, p. 2], discredited [2, p. 1337], dismissed at the point of diagnosis [4, p. 11], and carrying a hidden load that never makes it into the clinical record [5, p. 10]. EMA literature establishes that patient-reported items, in plain language with consistent wording, are the primary data and outperform proxy biometrics for capturing within-person change [§2; 6, 7, 8]. The JITAI framework requires receptivity as a gating tailoring variable and an explicit *"provide nothing"* intervention option [9, pp. 450, 455]. The voice rule of warm + cited + invitational is the structural element that allows direct lifestyle suggestions without crossing the wellness/medical-device line.
> **Product rule:** Neeve's user-facing surface uses the observation → reflection → invitation pattern, never observation → interpretation → prescription. Confidence labels per engine (tentative / moderate / strong) replace aggregate scores. Streaks, gamification, and cheerleader copy are categorically refused. Patient quotes are preserved verbatim. The bad day is shown, named, and respected. Alys is the human-facing surface of the receptivity-gated JITAI engines, never a chatbot.
> **User-facing language (voice example):** *"You've been at 8+/10 anxiety on 5 of the last 7 days, and you wrote that you can't shut off. Your HRV has stayed low and flat — the pattern bodies show when the sympathetic nervous system stays on. Caregiving load and work stress are showing up in the data. Worth talking to your GP about. If you want one small experiment this week, halving the caffeine and watching your HRV is a clean test."*
> **Doctor-facing language (handoff to §7):** *"Patient-generated longitudinal record over [N] days, validated symptom scales + continuous biometric data + verbatim patient context. Does not constitute diagnosis."*

---

## 7. What doctors see — the clinical surface

Neeve's doctor PDF is the clinical end-point that justifies the whole product. Here's the situation it's built for: a clinician gets minutes, and usually no long-term record to work from, so patterns slip past — not because anyone isn't trying, but because there's nothing solid in front of them. 64.6% of Australian POTS patients had their symptoms attributed to anxiety before diagnosis [16, p. 159], and the documented gap in how pain is recognised means women's pain is under-recognised more often than men's [3, p. 2]. The PDF's job is to put the missing evidence in the room. It has to be portable and self-contained, because chronically-ill Australians change specialists often — the Australian POTS registry found participants were currently seeing a mean of 7.5 specialists each [16, p. 159]. It has to be structured the way doctors actually read evidence: within-person trends (how *this* person changes over time), validated patient-reported outcomes labelled as such, confidence labels not verdicts. And it has to respect both the information-quality concerns clinicians legitimately hold AND the patient's agency — the patient is the only constant in their own care, and the report is theirs.

This section is the spec the engineer designing that PDF reads.

### 7.1 The problem this PDF solves

A patient walks into an appointment carrying months — sometimes years — of lived experience. The doctor has fifteen minutes to absorb it. The PDF's whole purpose is to compress that without flattening it.

Most attempts to bring patient-generated data into the room fall apart at exactly this step — and when they do, it tends to hurt the relationship rather than help it. "Patient-generated health data" (PGHD) just means health information the patient gathered themselves, outside the clinic. Lordon and colleagues' systematic review across thirteen studies found that this kind of data can improve communication and shared awareness, but the benefit collapses when patients arrive expecting a level of engagement the clinician simply doesn't have time to give. They put it directly: *"Patient-generated health data and patient-reported outcomes may improve patient health awareness and communication with clinicians but may negatively affect patient–clinician relationships"* [43, p. 2]. The mechanism, in their data, was unmet expectations: *"Unmet patient expectations during clinical encounters, such as unsuccessful efforts to request medical information from clinicians, can negatively affect patient satisfaction, treatment adherence, symptom improvement, and relationships with clinicians"* [43, p. 9].

The fix the same review identified is just as direct: give the clinician something they can read in the moments before the patient walks in. Across the included studies, the format that worked for clinician workflow was the pre-prepared summary: *"summarized reports that could be interpreted quickly immediately prior to patient encounters, which worked well for existing clinician workflows"* [43, p. 10]. That is the format Neeve produces. A static document the patient brings to the appointment, scannable in under a minute, structured so the clinician can find what they need without the patient having to manage the clinician's time.

HealthTale's qualitative work makes the same point from the patient's side. Smith and colleagues describe the gap as a mismatch between how patients build their own understanding and how clinical systems represent it: *"Patients often struggle to communicate coherent accounts of their health histories during time-constrained clinical encounters"*, and existing tools *"prioritize structured, clinician-centered data and provide limited support for eliciting and communicating patient-generated narratives"* [42, p. 1]. Their second design goal — the one Neeve's PDF inherits — is described as *"Communication: Support efficient communication through a static, shareable visualization artifact brought by the patient to an initial encounter with a clinician, enabling the rapid formation of a shared mental model"* [42, p. 2]. Static. Shareable. Brought by the patient. Those three properties are non-negotiable.

### 7.2 Information quality — what clinicians need to trust the report

When clinicians set patient-gathered data aside, it's usually not cynicism. It's that the data arrives missing the things they were trained to look for — and most clinicians want to help, but they can't act on something they can't trust. West and colleagues' literature review of twenty-three empirical studies of how clinicians perceive self-tracked data identifies six dimensions of information quality that PGHD typically fails on: *"accuracy and reliability, completeness, context, patient motivation, and representation"* [44, p. 1]. They are explicit that the underlying problem is provenance — knowing where a number came from and whether the tool that produced it has ever been checked: *"self-tracking tools produce data which are new and unfamiliar to clinicians, and are seldom clinically validated"* [44, p. 2].

The Neeve PDF answers each of those dimensions directly. The architecture is built around the answer.

**Accuracy and reliability.** Every metric in the PDF carries its instrument — the named, published tool it came from. Heart-rate data is sourced from the Neeve Ring, with sampling cadence (how often it sampled) noted in the methodology footer. Symptom-burden scores are named: MAPS, DSQ-PEM, MIDAS, EHP-30, FIQR, PHQ-9, GAD-7. Each score carries its published cut-off — the threshold researchers validated — as a reference line on the trajectory chart. West and colleagues' diagnostic walk-through scenario lists the questions a clinician will ask first: *"Which instrument did Rupert use? How does Rupert's doctor know if this instrument is accurate?... Is it just a single reading? Is it an average of three readings? If it is an average, how much time passed between readings?"* [44, p. 10]. The footer answers all of them, in small type, by name and citation.

**Completeness and missingness.** Where data is missing, the PDF says so plainly, rather than papering over the gap. Periods of non-wear, gaps in check-in completion, and check-ins skipped because of severe symptom load are surfaced explicitly as part of the record — not hidden. This matters because hidden gaps breed suspicion: West and colleagues note that clinicians *"feared that poor compliance was potentially indicative of selective reporting, which was seen as a means of concealing information from the clinician"* [44, p. 8]. The honest answer is to show the gaps. A missing day labelled "no check-in — symptom load high" is more credible than a smoothed line.

**Context.** Every ring-derived metric is set against the patient's own baseline — their own normal — never against a population norm. West and colleagues describe this as one of the hardest things to get right: *"Single data streams on their own may provide insufficient context about a patient's recordings for clinicians to make suitable judgments from them"* [44, p. 9], and clinicians' implicit reference point — population data — *"may help in interpreting types of measurement uncommon in clinical settings"* [44, p. 9]. The Neeve PDF marks both: the patient's own 7-day and 30-day baselines as the primary reference, and where a published clinical cut-off exists (orthostatic ΔHR ≥30 bpm, MAPS ≥42, PHQ-9 ≥10), it is shown as a reference line — never as a verdict.

**Patient motivation.** West and colleagues are blunt about this dimension: *"a patient's motivation for self-tracking, the routine they followed to take measurements, and the device they used influence a doctors decision to use the data"* [44, p. 10]. The PDF's cover page names the user as the patient (not as a research subject and not as a wellness consumer), states the date range covered, and includes a one-line description of why they are tracking. Motivation is part of the provenance.

**Representation.** West and colleagues' single most-quoted finding on format is that *"clinicians said temporal relationships were the most important, as they established causal relationships between potential triggers and symptoms. As a result, timelines were seen as the most natural way to represent patient self-tracked diaries"* [44, p. 4]. In other words, what doctors most want to see is what happened, in what order, next to what. The Neeve PDF is a stack of small-multiple timelines, condition by condition, anchored to a common date axis. The cross-condition observations section depends on this shared axis to make co-occurrence visible.

The unifying principle is that good data fails when the format makes it expensive to read: *"underlying data quality issues aside self-tracking systems today were viewed as more time-consuming and difficult to interpret, merely from a lack of presentational support for effective interrogation"* [44, p. 4]. Most PGHD doesn't get used because reading it costs the clinician too much. The Neeve PDF is designed to be cheap to interrogate — under a minute to orient, two minutes to read deeply, one page per engine.

### 7.3 Visualization principles — what HealthTale teaches

HealthTale is the most directly relevant visualisation study Neeve has, and most of its findings transfer. Smith and colleagues built a system that takes a patient's free-form story and turns it into a structured timeline, then evaluated it with 34 patients and 3 clinicians [42, p. 1].

The basic building block is the patient's own events grouped over time, not a score that compares them to other people. Their data abstraction *"organizes them across two cross-cutting grouping structures: the type of health concern, and the timing of when they occurred"* [42, p. 1]. Neeve's PDF uses the same unit. The spine is the patient's story; the columns are the conditions; the rows are time.

Their clinician evaluation surfaced two findings Neeve directly inherits. The first is that a static visualisation moves the effort off the clinician's plate at the moment they're busiest: *"the visualization supports rapid orientation and shared understanding. Clinicians described using the timeline to get a high-level understanding at the beginning of an encounter, enabling them to quickly identify relevant Events and areas for further inquiry. This ability to establish a 'lay of the land' is particularly valuable in time-constrained settings"* [42, p. 8]. The Neeve PDF leads with the at-a-glance summary precisely so the clinician gets the lay of the land before reading anything dense.

The second is that, for a document you can't click into, showing more beats showing less. HealthTale clinicians said *"that even details they perceived as less relevant to the clinician might be important to be presented, and thus favored presenting a complete view rather than selectively pre-filtering the representation"* [42, p. 8]. The Neeve PDF therefore includes the patient's own-words section (§7.5) even though most of it will not be acted on — that completeness is what makes the parts that do matter trustworthy.

HealthTale also documents what doesn't work. They went through several iterations to stop patients from misreading the width of an event box as a measure of how severe it was, and to encourage richer temporal detail [42, p. 7]. The Neeve PDF inherits the corrections: event glyphs are uniform in size; severity is encoded only in the PRO score trajectory, never in glyph dimensions; dates are explicit.

A patient quote from HealthTale's evaluation captures why a static artefact matters more than a slick interactive dashboard: *"I think sometimes it can be hard when you're seeing a new doctor, because you're like, 'Here's where I currently am, but here's all the history and how we got here,' and that can get kind of brushed over sometimes. So to see it all visualized in the same place, I think would help get them up to speed a little bit faster without feeling like a big burden on myself as the patient"* [42, p. 8]. That is exactly the load Neeve's PDF lifts: the burden of being the only continuity in your own care.

### 7.4 The Project HealthDesign lessons

Project HealthDesign was a Robert Wood Johnson Foundation programme that funded five academic teams to fold patient-gathered data into clinical workflows across asthma, cognitive decline, adolescent behavioural health, Crohn's disease, and premature infant follow-up. Cohen and colleagues' evaluation interviewed 13 study-team members and 12 clinicians [45, p. 1]. The findings establish what real clinical integration actually costs.

Three are decisive for Neeve.

**Clinicians need summaries, not raw data.** *"Requirements must be met to use PGHD in clinical outpatient settings. For example, PGHD needs to be summarized so that patterns can be easily visualized by health care professionals who also saw benefits in being able to manipulate these data"* [45, p. 6]. The PDF is a summary. It does not deliver raw heart-rate traces. The methodology footer notes that raw data is available to the patient on request and to the clinician with patient consent — but the document itself is the at-a-glance picture.

**Plugging into hospital record systems is hard, and isn't a precondition for value.** The teams hit repeated barriers around data storage, HIPAA-compliance, dashboard customisation, and fitting into clinician workflow [45, pp. 5–6]. Neeve sidesteps all of that by being a paper document the patient brings to the appointment. No write into the electronic health record, no portal login, no third-party data storage from the clinician's perspective. The patient holds and shares the artefact. Cohen and colleagues note that *"keeping ownership of these data with patients might avoid some of the legal complications of having the outpatient organization maintain PGHD"* [45, p. 7] — that is the architecture Neeve uses by default.

**Most clinicians don't have time, and most patients don't have the digital skills to build their own summary.** The same paper notes that these studies struggled because *"the usefulness of PGHD in the outpatient setting rests not only on data having clinical relevance but also relies on patients to collect these data"* [45, p. 7]. The Neeve PDF is generated by the app from the existing check-in and ring data — the patient does not assemble it by hand. The patient's only act is to print it (or open it on their phone in the room) and bring it.

What the evaluation also surfaced — and what every PGHD-in-clinic study has surfaced since — is that clinician trust grows out of familiarity with the format more than from the underlying data. Lordon and colleagues' review found integration worked best when *"clinicians reviewed brief summaries of PGHD prior to meeting with patients, which facilitated PGHD clinical integration"* [43, p. 10]. The Neeve PDF is designed to be that summary — the same shape every time, the same sections in the same order, so a clinician seeing their second or third Neeve patient orients instantly.

### 7.5 The Neeve doctor PDF — structure spec

Designing a document that works for patients, doctors, and health systems all at once is genuinely hard, and Rajabiyazdi and colleagues call it a "wicked problem" — the kind with no single clean answer. They argue that *"designing patient-collected health data visualizations to support discussing patient data during clinical visits is a challenging problem due to the heterogeneity of the parties involved: patients, healthcare providers, and healthcare systems"* [46, p. 1], and that *"wicked problem solutions cannot be black or white"* [46, p. 2]. Their conclusion after five years of iterative design work with patients and clinicians in Alberta is that the only defensible approach is to *"design individualized solutions by considering each patient. Each patient has a unique body, a highly individualized lifestyle, a different set of goals, and a personalized patient-provider relationship"* [46, p. 7].

Neeve's resolution is structural: the PDF has a fixed skeleton so clinicians can orient instantly, and individualised content within each section so the artefact reflects the actual patient in front of them. Below is the binding spec.

- **Cover page.** Patient name; date of birth; Neeve patient ID (the user's continuity identifier across rings, app reinstalls, and engine version changes); date range covered by the report (e.g. "1 March 2026 – 31 May 2026, 92 days"); the canonical safety line, verbatim: *"This is a patient-generated longitudinal record. It does not constitute diagnosis."*

- **At-a-glance summary (page 2).** Active engines for this patient (POTS / ME-CFS / Migraine / Endometriosis / Fibromyalgia / Anxiety overlay), each with one summary line. Example shape: *"3 POTS-pattern candidate events over 30 days; 2 PEM crashes; 5 migraine attacks; MAPS 58 (cut-off ≥42); DSQ-PEM substantial-severe on 3 of 5 items."* The summary is what the clinician reads in the first thirty seconds.

- **Per-engine sections, in order of clinical relevance for this patient.** Each engine gets one page, structured the same way every time:
  - **Diagnostic-relevant patterns** with their confidence labels (e.g. *"POTS-pattern candidate, confidence: moderate, 3 events across 14 days; orthostatic hypotension not excluded — clinical BP required"*). Confidence is named — never implied.
  - **Validated PRO scores with cut-offs as reference lines.** MAPS for POTS (cut-off ≥42, sensitivity 96.8% / specificity 98.0%) [14, p. 95]. DSQ-PEM for ME/CFS, with the five PEM items separately scored and the substantial-severe threshold marked [18]. MIDAS for migraine with the disability-grade bands [26]. EHP-30 for endometriosis. FIQR for fibromyalgia [38]. PHQ-9 and GAD-7 for the anxiety overlay, **split into somatic vs cognitive-affective subscales** so somatic items inflated by the underlying physical illness don't drive a false depression signal. Every score shows its trajectory with its cut-off marked.
  - **Ring-derived context** (resting HR, HRV, sleep efficiency, activity), plotted against the patient's own 7-day and 30-day baselines — never against population norms. Population reference is provided only where a published clinical cut-off exists (e.g. orthostatic ΔHR ≥30 bpm).

- **Cross-condition observations.** A single section that surfaces engines with overlapping signal — autonomic dysfunction visible in both POTS and Fibromyalgia engines; PEM and migraine prodrome both flagged on the same day; check-in pain spikes co-occurring with cycle-tracked menses for an endometriosis user. The shared time axis from §7.3 is what makes this section possible.

- **What the patient reported in their own words.** The consolidated free-text "anything to add" field from check-ins, dated, in chronological order. This is the part where the patient speaks directly to the doctor through the document. It is verbatim, unedited, and structured chronologically — not summarised by Alys, not paraphrased, not condensed. HealthTale's clinician findings support this: completeness over minimalism, patient ownership over AI editorialising [42, p. 8].

- **Methodology footer.** Small but present. Lists: scales used (with citations), cut-offs applied, engine version, ring SDK version, sampling cadence, missing-data summary, Neeve regulatory positioning ("wellness; does not diagnose"). Credibility through provenance — exactly the dimension West and colleagues identify as the most decisive for clinician trust [44, pp. 1, 10].

- **NOT in the PDF.** No streaks. No scores presented as overall "wellness" verdicts (PRO scores appear only as named, validated instruments with cited cut-offs). No "your wellness is X%". No algorithmic differential diagnosis. No medication recommendations. No predictions. No emoji, no gamification, no encouragement copy. The PDF is the clinical surface and it stays clinical.

### 7.6 What the PDF never says

The forbidden phrases are the same as the rest of the product (§10 Regulatory Boundary Table). The PDF never says *"POTS detected"*, *"POTS likely"*, *"PEM episode detected"*, *"ME/CFS crash confirmed"*, *"migraine predicted"*, *"migraine imminent"*, *"your body is inflamed"*, *"you slept badly"*, *"your fitness is declining"*, or *"endometriosis flare detected"*. It uses the wellness-safe wording in the left column of the §10 table verbatim — *"pattern worth discussing"*, *"possible early-warning pattern"*, *"appeared alongside"*, *"shifted from your baseline"*. The PDF inherits the Claim Library (§9) without exception.

The PDF also never speaks for the patient. The "what the patient reported in their own words" section is the patient's voice — not Alys's, not Neeve's, not paraphrased by an LLM into clinical language. That is structural. Patients with chronic illness have been spoken-over their whole diagnostic journey [1, p. 2; 4, p. 11]. The artefact that goes into the appointment must preserve their voice as data.

> **Evidence → product (Doctor PDF summary)**
>
> **Evidence:** Clinicians trust summarised, timeline-structured, statically-shareable PGHD that names its instruments and cut-offs and arrives pre-prepared [43, p. 10; 44, p. 4; 42, pp. 1–2, 8]. They distrust raw, decontextualised, unvalidated self-tracking and dismiss it when motivation or provenance is unclear [44, pp. 2, 10]. EHR-integrated PGHD is a hard and contested implementation problem; patient-owned, paper-portable artefacts side-step most of it [45, pp. 5–7]. The format must individualise content while keeping a consistent skeleton, because visualising patient health data is a wicked problem with no single correct answer [46, pp. 1–2, 7].
> **Product rule:** The Neeve doctor PDF is a static, patient-owned, paper-portable summary structured as fixed skeleton + individualised content. Every metric carries its instrument, cut-off, and confidence label. Patterns are named as candidates, never as diagnoses. Patient voice is preserved verbatim. No EHR write, no clinician portal, no third-party storage — the patient owns and shares the artefact.
> **User-facing language:** *"This is your record to bring to your next appointment. It shows what your body did, what you reported, and what scales like MAPS and PHQ-9 say — with the cut-offs your clinician will recognise. It does not diagnose anything. You decide who sees it."*
> **Doctor-facing language (PDF cover page, verbatim):** *"This is a patient-generated longitudinal record. It does not constitute diagnosis."*

---

---

## 8. Safety and regulatory positioning

This section is the rulebook for everything Neeve says and does — the page you point at when a piece of website copy, an app message, a marketing email, an investor deck, or a TestFlight build needs to be checked before it ships. It also sets down, in plain terms, what Neeve will never claim, no matter how much more compelling the bigger claim would sound. The people this product serves have already been let down by enough health software that overpromised and underdelivered.

### 8.1 The line — wellness vs medical device

There's a line in Australian law, and Neeve sits firmly on one side of it. Software here is regulated by the Therapeutic Goods Administration under the Therapeutic Goods Act 1989 and the Therapeutic Goods (Medical Devices) Regulations 2002. On one side is **wellness software** — generally outside TGA regulation under the Excluded Goods Order. On the other is **Software as a Medical Device (SaMD)** — regulated, classified, and formally assessed. What decides which side you're on is intent: does the software set out to diagnose, prevent, monitor, treat, or alleviate disease in a person? If yes, it's regulated. If no, it's wellness.

Neeve is built to stay on the wellness side. That commitment shows up in three concrete ways:

1. **No diagnostic claims.** The Claim Library (§9) and the Regulatory Boundary table (§10) are the working tools that enforce this. Every output of every engine, every line of marketing copy, every PDF heading, every Today-screen observation has to pass the Claim Library. The forbidden phrases — *"X detected"*, *"X likely"*, *"X confirmed"*, *"X predicted"* — are the ones that would flip the product into SaMD territory.
2. **No therapeutic claims.** Neeve does not claim to treat any condition. The dignity layer voice in §6 frames lifestyle suggestions as experiments the user runs themselves, backed by general research — not as a personal prescription. *"Want to try halving your caffeine for a week and let your check-ins tell you what happens?"* is wellness. *"Cut caffeine to treat your anxiety"* is a therapeutic claim, and so it is not permitted.
3. **No prediction of medical events.** Neeve does not predict migraines, crashes, flares, or any acute medical event. The migraine engine (§5.3) and the ME/CFS engine (§5.2) both use the language *"possible early-warning pattern"* and *"possible post-exertional symptom increase"* — describing what's happening now, not forecasting what's coming. The Regulatory Boundary table spells this out.

The same logic carries over to the US framework, which matters when Neeve eventually targets that market. There, validated symptom questionnaires — what the field calls Patient-Reported Outcome (PRO) instruments, structured forms a patient fills in themselves — are recognised for clinical use under FDA guidance set out in the IMMPACT recommendations (referenced via the May et al EMA review of chronic-pain methodology [59]). Neeve administers validated PROs (MAPS, DSQ-PEM, MIDAS, EHP-30, FIQR, PHQ-9, GAD-7) at the cadence they were validated for, and uses their published cut-offs as reference lines, not as verdicts. The instruments do the clinical work; Neeve is the shell that administers them over the long run.

### 8.2 What Neeve explicitly does NOT claim

The Regulatory Boundary table in §10 is the authoritative list. Here are the hard commitments, pulled together in one place:

- Neeve does not diagnose any condition. POTS, ME/CFS, migraine, endometriosis, fibromyalgia, anxiety, depression — none of them. Diagnosis means a clinical assessment with other causes ruled out, and Neeve is structurally unable to do that. The engines surface *pattern candidates* with confidence labels; the clinician closes the loop.
- Neeve does not predict acute medical events. No "migraine in 4 hours" alerts. No "you will crash tomorrow" notifications. The migraine engine names *possible early-warning patterns*; the ME/CFS engine names *mild post-exertional symptom increase*. Both describe the current state, not a future one.
- Neeve does not replace medical care. The user is encouraged to take the doctor PDF to their clinician. The app is for what happens between appointments — not a stand-in for them.
- Neeve does not prescribe medication. Full stop, no matter how strongly the data suggests one might help. That is illegal without medical credentials.
- Neeve does not recommend specific specialists. The doctor PDF and the Today screen frame referral questions as questions the patient may wish to ask their GP, never as *"see a cardiologist"* or *"see a psychiatrist"*. GPs orchestrate referrals; the app does not.
- Neeve does not produce wellness scores. No "you're at 73% today", no daily rating, no aggregate "health score". The dignity layer in §6 explains why, structurally — wellness scores punish chronic illness and recreate the exact dismissal §1 documents.
- Neeve does not gamify chronic illness. No streaks, badges, levels, milestones, or any engagement mechanism that breaks on a bad day.

### 8.3 What Neeve DOES claim — the lifestyle-experiment pattern

So how does Neeve say anything useful at all without crossing the line? The voice rule in §6.2 is the mechanism. Every direct suggestion is built from four pieces:

1. **Cited general evidence.** *"Caffeine is a stimulant linked to higher anxiety and lower HRV in most people"* — population-level, citable, not about you specifically.
2. **Within-person observation.** *"Your HRV has been lower than your usual range for two weeks"* — measured against the user's own baseline.
3. **Invitation to experiment.** *"Want to try halving it for a week?"* — the user is the scientist; consent is built into the structure.
4. **Data as the verdict.** *"Your check-ins and HRV will tell you what changed."* — the app doesn't pronounce the result; the user's own data over time does.

This is the same pattern Oura, WHOOP, Garmin, and every other credentialed wellness app uses to stay on the wellness side of the line. It works because it keeps the user in charge, avoids prescriptive claims, and makes the data — not the algorithm — the protagonist.

### 8.4 The Claim Library as a governance mechanism

The Claim Library in §9 isn't just a marketing convenience — it's how we hold ourselves to the regulatory line over time. Every claim Neeve makes about itself, its outputs, or its evidence has a row. The columns are: the claim, whether it's allowed (yes / yes-with-conditions / no), the evidence with citation, and the safer wording we use when the strong claim isn't allowed.

The Library is the single source of truth for:

- Website copy (every claim on neeve.com.au flows through it)
- App strings (every observation Alys surfaces, every PDF heading, every onboarding screen)
- Marketing collateral (ads, social, investor decks, press releases)
- App Store and Play Store descriptions
- TGA registration documents
- Any future SaMD pre-submission packages if scope changes

When a draft of any of the above uses wording that doesn't match the "Safer wording" column of the Library, the draft loses. The Library is updated before the draft, not after. That discipline is what keeps a small team saying the same things, consistently, over years as the product surface grows.

### 8.5 Apple App Store considerations

Apple adds its own rules on top, and health-and-fitness apps get extra scrutiny. The relevant parts of the App Store Review Guidelines are 1.4 (Safety — Physical Harm) and 5.1 (Privacy). Here's where Neeve stands:

- **No health claims that require regulatory clearance** (Apple §1.4.1). The Claim Library + Regulatory Boundary table cover this. The App Store description uses only the "Safer wording" column.
- **Honest permission strings.** The Info.plist usage descriptions for Bluetooth, HealthKit (when adopted), camera (if used for QR scanning), and notifications all describe truthfully what the data is used for. No marketing-speak in permission strings. Per Apple §5.1, vague or misleading permission requests are grounds for rejection.
- **In-app data deletion.** Per Apple §5.1.1 (v), apps that collect health data must let the user delete that data from inside the app. Neeve provides a "delete my data" flow in Settings that wipes the user's records from the backend and confirms the deletion. The user owns their data and can take it back.
- **No background HealthKit reads without justification.** When Neeve eventually integrates HealthKit, reads are scoped to what is shown in the doctor PDF or required by an active engine. Nothing is read "in case it's useful later".
- **No third-party SDK that leaks health data.** Sentry (planned per task #168) will be configured to scrub health-identifying fields. Analytics (if added) will not transmit any check-in answer or biometric value off-device without explicit user opt-in.

### 8.6 Australian Privacy Principles and data ownership

Health information gets the strongest protection Australian law offers. Under the Privacy Act 1988 it counts as sensitive information, with the highest bar attached. Here's what Neeve commits to under the Australian Privacy Principles (APPs):

- **APP 1 (open and transparent management).** A plain-English privacy policy is shipped with the app, accessible from Settings, written at a reading level a tired chronically-ill person can absorb. Not legalese.
- **APP 3 (collection only of what's necessary).** Neeve collects what the engines need. Nothing else. The questions in the daily check-in are scoped to felt-experience + named context; the ring streams only what the user has consented to.
- **APP 5 (notification of collection).** Every new data type added to the engines triggers an updated privacy notice, with the user offered the chance to opt out.
- **APP 6 (use or disclosure).** Health data is not sold. Health data is not shared with advertisers. Health data is not used for any purpose other than serving the user, generating their doctor PDF, and improving the engines (anonymised, aggregated, opt-in).
- **APP 11 (security).** Health data in transit is TLS. Health data at rest in Supabase is encrypted. Keys are managed through Supabase + Cloudflare Worker secret stores. Access is least-privilege and audited.
- **APP 12 (access).** The user can export everything Neeve holds about them at any time. The export is the same data the doctor PDF is built from, in machine-readable form.
- **APP 13 (correction).** The user can correct any record, including check-in answers (with versioning so the original is preserved for audit, and the corrected value flagged).

Underneath all of it sits one principle: the user owns their data. Neeve is a custodian, not a proprietor. The doctor PDF stays patient-owned and paper-portable (§7) precisely because that's the architecture that respects ownership at every step.

### 8.7 Safety-net behaviours that do NOT require regulation

Some of what Neeve does here, no rule forces us to do. We do it because the chronic-illness audience deserves it.

- **Suicidality footer on PHQ-9 item 9.** PHQ-9 item 9 asks about suicidal thoughts. When a user scores 1 or higher on item 9, the in-app footer surfaces Lifeline (13 11 14), Beyond Blue (1300 22 4636), and the option to text 0477 13 11 14. The footer is quiet, always available, and never blocks the rest of the app. It isn't tied to a "concerning score" threshold — the footer appears any time item 9 is non-zero.
- **Crisis language sensitivity.** If the user writes free text containing crisis-indicative language (named patterns from clinical literature on suicide-screening NLP — that is, computer recognition of written language), Alys stays silent on observations that day and the footer surfaces with extra prominence. This is not an emergency response system — that is explicitly disclaimed — it's a dignity-preserving behaviour for a moment that warrants it.
- **No notification escalation around crisis content.** Once a crisis pattern is logged, Neeve does not send "we noticed you're struggling" pushes. That kind of notification is intrusive and clinically counter-productive. The footer is the surface, and the user controls it.
- **Plain-language data export.** The "download my data" flow exports both the raw rows AND a human-readable summary. Patients carry the human-readable summary into emergency departments when they can't speak for themselves. This is a real use case for the audience, and the architecture supports it.

### 8.8 What changes the regulatory posture

Everything above only holds while the structural commitments hold. The wellness posture changes the moment any of the following ever ships:

- A diagnostic claim (any verb from the Regulatory Boundary table's right column)
- A treatment claim ("Neeve treats X")
- A prediction of acute medical events ("you will have a migraine in 4 hours")
- A wellness score or aggregate health rating
- A clinical decision-support module the doctor uses inside the EHR
- Anything that produces a recommendation a clinician acts on without independent review

Any one of those is a one-way door into SaMD classification. Walking through it means regulatory submission, clinical validation studies, post-market surveillance, and ongoing reporting. None of that is impossible — many credentialed digital therapeutics live on that side — but it's a categorically different product. Neeve's current positioning is wellness, and the foundations doc, the Claim Library, the Regulatory Boundary table, and the dignity layer are the structural mechanisms that keep it there.

> **Evidence → product (Safety and regulatory summary)**
>
> **Evidence:** Australian SaMD classification is triggered by intent to diagnose / prevent / monitor / treat / alleviate disease. Wellness software under the Excluded Goods Order is outside scope when those claims are absent. PRO instruments validated per IMMPACT/FDA guidance [via 5] are the credentialed mechanism for symptom tracking. Apple App Store §1.4 + §5.1 require honest permission strings, in-app health-data deletion, and no health claims requiring regulatory clearance. Australian Privacy Principles 1–13 apply to health information as sensitive information.
> **Product rule:** Neeve stays wellness-side through (1) no diagnostic / therapeutic / predictive claims; (2) the lifestyle-experiment voice pattern in §6.2; (3) the Claim Library + Regulatory Boundary table as governance; (4) Apple-aligned permissions and deletion; (5) APP-compliant privacy + data ownership architecture; (6) added safety-net behaviours (suicidality footer, crisis language sensitivity, plain-language export) that exceed the regulatory floor.
> **User-facing language:** *"Neeve is a wellness app for chronic illness self-tracking. It doesn't diagnose. It doesn't replace medical care. It generates a record you take to your clinician. You own your data."*
> **Doctor-facing language (PDF cover page, verbatim):** *"This is a patient-generated longitudinal record. It does not constitute diagnosis."*

---

## 9. Claim Library

A binding table of every claim Neeve makes about itself, its outputs, and its evidence. Every entry has: the claim, whether it's allowed (yes / yes-with-conditions / no), the evidence (or its absence) with citation, and the safer wording we use when the strong claim isn't allowed. This table is the source of truth for marketing copy, the website, in-app strings, regulatory submissions, and TGA / Apple safety filtering. If a draft anywhere uses wording that doesn't match the "Safer wording" column, the draft loses.

Starter entries (grows as conditions get specced):

| Claim | Allowed? | Evidence | Safer wording |
|---|---|---|---|
| Neeve diagnoses [POTS / ME-CFS / migraine / endometriosis / fibromyalgia / any condition] | **No** | All conditions require clinical assessment per their published criteria. POTS requires BP exclusion the ring can't deliver [12, p. e43]. ME/CFS and migraine require clinical history. Safety language rule applies. | *"Neeve identifies [condition]-pattern candidates"* / *"Neeve highlights patterns that may be worth discussing with your clinician"* |
| Neeve detects [pattern / flare / crash] | **No** | Wearable + EMA literature supports pattern identification, not detection. Detection implies clinical-grade verification we can't provide. | *"Neeve highlights possible patterns"* / *"appeared alongside"* / *"a pattern worth noticing"* |
| Neeve predicts [migraine / crash / flare] | **No** | No engine has prediction-grade validation in our build. Prodrome detection literature [pending §5.3] supports flagging, not prediction. | *"Neeve flags moments that may be worth noticing"* / *"early-warning pattern"* |
| Neeve replaces medical care | **No** | Regulatory boundary. TGA + Apple review require explicit disclaimer. | *"Neeve is for what happens between appointments"* |
| Neeve helps capture symptoms closer to when they happen | **Yes** | EMA reduces recall bias relative to clinic recall [6, 7, 8] | Plain wording allowed: *"Neeve helps you capture symptoms close to when they happen"* |
| Neeve supports pacing | **Yes (careful)** | Gabriel 2024 POTS feasibility supports HR-based pacing as a management aid [15, p. 159, 163]. ME/CFS pacing literature [pending §5.2]. | *"Neeve helps you see how your activity, heart rate and recovery line up"* |
| Neeve produces a doctor-ready report | **Yes** | PGHD literature supports patient-generated data in clinical settings [pending §7]. | *"Neeve generates a report you can take to your clinician"* |
| Neeve gives you evidence that earns a serious conversation | **Yes (positioning, not clinical)** | Australian POTS registry diagnostic-delay and dismissal data [16, p. 159–160]; gender pain gap [3]; epistemic injustice in chronic illness [2]; medical gaslighting research [1, 4]. | *"Patient-generated longitudinal record grounded in validated symptom scales and continuous biometric data"* — positioning language defensible against the cited literature. |
| In Australia, POTS = serious diagnostic delay + dismissal + reduced function | **Yes** | MJA registry data [16, p. 159–160] | *"In Australia, people with POTS often face long diagnostic delays, repeated emergency presentations, reduced social participation and unemployment."* |
| Neeve uses an EMA-based check-in system | **Yes** | Methodology grounded in May et al 2018; Hall 2021 [6]; Song 2023 [7]; Tarca 2024 [8] | *"Neeve's check-ins are based on ecological momentary assessment, a clinical-research method for capturing symptoms in the moment rather than from memory."* |
| Neeve is a just-in-time adaptive intervention (JITAI) | **Yes** | Six-component architecture matches Nahum-Shani 2018 [9]; receptivity gating modelled (which most fielded JITAIs don't do, per van Genugten 2025 [10] and Teepe 2021 [11]). | *"Neeve is built as a properly specified just-in-time adaptive intervention — it adapts what it asks and when, and it stays quiet when you don't need it."* |
| Neeve detects / confirms a PEM crash or ME/CFS | **No** | PEM is the compulsory clinician-diagnosed feature of ME/CFS [17]; objective confirmation is 2-day CPET [19], not a wearable. Engine identifies patterns only. | *"possible post-exertional symptom increase"* / *"yesterday's load may explain today's symptoms"* |
| Neeve flags a possible migraine early-warning pattern | **Yes (careful)** | PRODROME trial [23] + EMA [24] show within-person prodrome consistency; wearable nocturnal signal is real but modest (F1 0.607) [25]. Flagging, never prediction. | *"possible early-warning pattern"* — never *"migraine predicted/imminent"* |
| Neeve detects an endometriosis flare | **No** | Diagnosis requires imaging/laparoscopy [27, p.9]; ESHRE endorses symptom diaries only for *"objectifying pain and empowering women"* [27, p.23], not diagnosis. | *"pain appeared alongside your cycle pattern"* / *"a cycle-locked pattern worth discussing"* |
| Neeve screens for / detects fibromyalgia | **No** | The self-report ACR criteria are *"not valid for clinical diagnosis in individual patients"* [37, p.320]; FSQ interpretation *"belongs to the physician"* [39, p.5]. | *"widespread-pain map"* trend + *"polysymptomatic-distress (FSQ) trend"* — never *"fibromyalgia detected"* |
| Neeve diagnoses or identifies ADHD | **No** | ASRS is *"a brief screening instrument"* [53, p.3]; diagnosis needs DIVA-5 / psychiatrist interview. | *"your ASRS screener score — a starting point for the GP conversation"* — never *"ADHD detected"* |
| Neeve screens for depression / anxiety | **Yes (careful)** | PHQ-9 [32] and GAD-7 [33] are validated screeners at a 2-week cadence — screening thresholds, not diagnoses [33, p.6]; somatic items inflate totals in chronic illness [34, 35]. | *"your fortnightly mood/anxiety check-in scored higher — worth raising with your clinician"*; doctor PDF splits somatic vs cognitive-affective sub-scores. Never *"depression detected"*. |
| Neeve tracks symptom burden with clinically validated scales | **Yes** | MAPS [14], DSQ-PEM [18], MIDAS [26], EHP-30 [28], FIQR [38], PHQ-9 [32], GAD-7 [33] administered at their validated cadence with published cut-offs as reference lines. | *"Neeve uses clinically validated questionnaires, at the cadence they were designed for, and shows your trend against the published cut-off."* |

---

## 10. Regulatory Boundary Table

Wellness-safe vs higher-risk phrasing reference. We use the left column. The right column is what we never say — anywhere in product, marketing, website, or doctor PDF.

| Pattern | Wellness-safe (use) | Higher-risk (never use) |
|---|---|---|
| Sustained HR rise after standing | *"Heart rate rose and stayed up after standing — a pattern worth discussing"* | *"POTS detected"* / *"POTS likely"* |
| Worsening after activity | *"Possible post-exertional symptom increase"* | *"PEM episode detected"* / *"ME/CFS crash confirmed"* |
| Pre-headache pattern | *"Possible early-warning pattern"* | *"Migraine predicted"* / *"Migraine imminent"* |
| HRV trending down | *"Lower than your usual baseline"* | *"Your body is inflamed"* / *"You're stressed"* |
| HRV trending up | *"Closer to your usual baseline"* | *"Recovery complete"* / *"You're at 100%"* |
| Sleep pattern change | *"Sleep efficiency shifted from your baseline"* | *"You slept badly"* / *"Bad sleep score"* |
| Resting HR baseline drift | *"Your resting heart rate has shifted [X] bpm vs the last 7 days"* | *"Your fitness is declining"* / *"Cardiovascular risk increasing"* |
| Cyclical pain pattern in users tracking cycles | *"Pain appeared alongside your cycle pattern"* | *"Endometriosis flare detected"* |
| Widespread multi-site pain | *"Your widespread-pain map shifted from your baseline"* | *"Fibromyalgia flare detected"* / *"Your fibromyalgia is worsening"* |
| Attention / focus pattern by time of day | *"Morning clarity has been lower than evening — worth noticing"* | *"ADHD detected"* / *"You have ADHD"* |
| Elevated mood/anxiety screener | *"Your fortnightly check-in scored higher this round — worth raising with your clinician"* | *"You're depressed"* / *"Depression detected"* / *"Your anxiety is X"* |
| Autonomic signal shared across engines | *"A POTS-pattern candidate appeared alongside your fibromyalgia-pattern data"* | *"Your sympathetic nervous system is overactive"* |

---

## 11. Evidence Quality Legend

Each reference is rated A–D for evidence weight. Grades applied across all 59 references 2026-06-05 (index below); future agents grade new refs as they cite them.

- **A — Strongest.** Consensus statement, clinical guideline, validated PRO instrument, systematic review with meta-analysis.
- **B — Strong.** Cohort study, registry data, large controlled observational study.
- **C — Moderate.** Feasibility study, qualitative study, small RCT, case report.
- **D — Hypothesis.** Internal design inference, theoretical mapping, mechanism reasoning.

**Grade index (ref numbers):**
- **A (21):** 6, 9, 12, 14, 17, 18, 19, 26, 27, 28, 29, 31, 32, 33, 37, 38, 39, 49, 51, 52, 59 — consensus statements/guidelines (HRS POTS [12], ICC [17], ESHRE [27], ACR fibro [37]), validated PRO instruments (MAPS [14], DSQ-PEM [18], MIDAS [26], EHP-30 [28], ESD [29], FIQR [38], PHQ-9 [32], GAD-7 [33]), and systematic reviews/meta-analyses (Hall EMA [6], Lim CPET [19], Colombo [31], Charlton [51], May [59]); plus the JITAI canonical framework [9], the landmark pulse-oximetry-bias cohort [49], and the authoritative cuffless-BP review [52].
- **B (17):** 7, 10, 16, 20, 21, 22, 23, 30, 34, 35, 36, 43, 47, 48, 50, 53, 56 — registries/large cohorts/surveys (Australian POTS registry [16], RECOVER [20], Armour endo survey [30], Yokoya [35], Khanal [36]), validation/diagnostic-accuracy studies (Song [7], Göbel [22], Beswick [34], Longmore [47], Bent [48], Cao [50], Brevik [53]), and systematic/scoping reviews (van Genugten [10], Sanal-Hayes pacing [21], Lordon [43], Attoe [56], PRODROME screening data [23]).
- **C (20):** 1, 2, 3, 4, 5, 8, 11, 13, 15, 24, 25, 40, 41, 42, 44, 45, 54, 55, 57, 58 — qualitative studies (gaslighting [1], Brauer [4], Estecha Querol [5], HealthTale [42], West [44], Cohen/PHD [45]), small/feasibility studies (Tarca [8], Breslin case report [13], Gabriel [15], Houtveen [24], Kapustynska [25], Kang [40], Yagiz On [41], Mendonsa audit [58]), reviews/commentary/perspective (de Boer [2], Laughey [3], Teepe [11], Kustow [54], Luu [55], Bradlow [57]).
- **D (1):** 46 — Rajabiyazdi wicked-problem design reflection (methodology/rationale, not clinical evidence).
- **Added 2026-06-05 (Lane 2 evidence deepening):** 60 PROMIS four-item validation in chronic pain — **A**; 61 POTS–HSD–MCAS overlap (retrospective cohort, n=100) — **B**; 62 Eaton-Fitch ME/CFS Australian SF-36 QoL (cross-sectional, n=480) — **B**.

These ratings inform the Claim Library (§9): claims grounded in A-grade evidence carry bolder language; D-grade is reserved for design rationale and is never quoted as clinical justification in marketing or the doctor PDF.

---

## Bibliography

1. Bokek-Cohen Y, Gabay G. Medical gaslighting as a threat to beneficence and patient autonomy: a qualitative study. BMC Med Ethics. 2026;27(5):1–9.

2. de Boer ML. Epistemic in/justice in patient participation. A discourse analysis of the Dutch ME/CFS Health Council advisory process. Sociol Health Illn. 2021;43(6):1335–54.

3. Laughey W, Vincent K, Iyer S, Cobo MM, Slater R. Pain in women: bridging the gender pain gap. Pain Rep. 2025;10(3):e1276.

4. Brauer L, de Cruppé W, Geraedts M. "Take me seriously": a qualitative interview study exploring healthcare experiences of endometriosis patients. PLoS One. 2025;20(5):e0323883.

5. Estecha Querol S, Clarke P, Sattler ELP, Halford JCG, Gabbay M. Non-visible disease, the hidden disruptive experiences of chronic illness in adversity. Int J Qual Stud Health Well-being. 2020;15(1):1857579.

6. Hall M, Scherner PV, Kreidel Y, Rubel JA. A systematic review of momentary assessment designs for mood and anxiety symptoms. Front Psychol. 2021;12:642044.

7. Song J, Howe E, Oltmanns JR, Fisher AJ. Examining the concurrent and predictive validity of single items in ecological momentary assessments. Assessment. 2023;30(5):1662–71.

8. Tarca B, Jesudason S, Wycherley TP, Le Leu R, Ovenden M, Meade A, et al. Ecological momentary assessment to explore fatigue, mood, and physical activity levels in people receiving peritoneal dialysis. Kidney Int Rep. 2024;9(3):601–10.

9. Nahum-Shani I, Smith SN, Spring BJ, Collins LM, Witkiewitz K, Tewari A, et al. Just-in-Time Adaptive Interventions (JITAIs) in mobile health: key components and design principles for ongoing health behavior support. Ann Behav Med. 2018;52(6):446–62.

10. van Genugten CR, Thong MSY, van Ballegooijen W, Kleiboer AM, Spruijt-Metz D, Smit AC, et al. Beyond the current state of just-in-time adaptive interventions in mental health: a qualitative systematic review. Front Digit Health. 2025;7:1460167.

11. Teepe GW, Da Fonseca A, Kleim B, Jacobson NC, Salamanca Sanabria A, Tudor Car L, et al. Just-in-time adaptive mechanisms of popular mobile apps for individuals with depression: systematic app search and literature review. J Med Internet Res. 2021;23(9):e29412.

12. Sheldon RS, Grubb BP II, Olshansky B, Shen W-K, Calkins H, Brignole M, et al. 2015 Heart Rhythm Society Expert Consensus Statement on the Diagnosis and Treatment of Postural Tachycardia Syndrome, Inappropriate Sinus Tachycardia, and Vasovagal Syncope. Heart Rhythm. 2015;12(6):e41–e63.

13. Breslin D, Synnott P, Byrne C. Active stand testing for identification of postural orthostatic tachycardia syndrome. Cureus. 2023;15(4):e38281.

14. Spahic JM, Hamrefors V, Johansson M, Ricci F, Melander O, Sutton R, et al. Malmö POTS symptom score: assessing symptom burden in postural orthostatic tachycardia syndrome. J Intern Med. 2023;293(1):91–9.

15. Gabriel AS, Tsai T-Y, Reategui-Rivera CM, Rocco P, Smiley A, Powers C, et al. Feasibility assessment of a wearable app to manage symptoms of postural orthostatic tachycardia syndrome using real-time heart rate monitoring. Stud Health Technol Inform. 2024;316:159–66.

16. Seeley M-C, Wilson G, Ong E, Langdon A, Chieng J, Bailey D, et al. Symptom burden, quality of life, and diagnostic journey of people with postural orthostatic tachycardia syndrome, Australia, 2021–24: a descriptive patient registry data study. Med J Aust. 2025;223(3):159–60.

22. Göbel CH, Karstedt SC, Münte TF, et al. ICHD-3 is significantly more specific than ICHD-3 beta for diagnosis of migraine with aura and with typical aura. J Headache Pain. 2020;21(1):2.

23. Schwedt TJ, Lipton RB, Goadsby PJ, et al. Characterizing prodrome (premonitory phase) in migraine: results from the PRODROME trial screening period. Neurol Clin Pract. 2025;15(1):e200359.

24. Houtveen JH, Sorbi MJ. Prodromal functioning of migraine patients relative to their interictal state — an ecological momentary assessment study. PLoS One. 2013;8(8):e72827.

25. Kapustynska V, Abromavičius V, Serackis A, et al. Machine learning and wearable technology: monitoring changes in biomedical signal patterns during pre-migraine nights. Healthcare (Basel). 2024;12(17):1701.

26. Carvalho GF, Luedtke K, Braun T. Minimal important change and responsiveness of the Migraine Disability Assessment Score (MIDAS) questionnaire. J Headache Pain. 2021;22(1):126.

17. Carruthers BM, van de Sande MI, De Meirleir KL, Klimas NG, Broderick G, Mitchell T, et al. Myalgic encephalomyelitis: international consensus criteria. J Intern Med. 2011;270(4):327–38.

18. Cotler J, Holtzman C, Dudun C, Jason LA. A brief questionnaire to assess post-exertional malaise. Diagnostics. 2018;8(3):66.

19. Lim E-J, Kang E-B, Jang E-S, Son C-G. The prospects of the two-day cardiopulmonary exercise test (CPET) in ME/CFS patients: a meta-analysis. J Clin Med. 2020;9(12):4040.

20. Vernon SD, Zheng T, Do H, Marconi VC, Jason LA, Singer NG, et al. Incidence and prevalence of post-COVID-19 myalgic encephalomyelitis: a report from the observational RECOVER-Adult study. J Gen Intern Med. 2025;40(5):1085–94.

21. Sanal-Hayes NEM, Mclaughlin M, Hayes LD, Mair JL, Ormerod J, Carless D, et al. A scoping review of 'Pacing' for management of myalgic encephalomyelitis/chronic fatigue syndrome (ME/CFS): lessons learned for the long COVID pandemic. J Transl Med. 2023;21(1):720.

37. Wolfe F, Clauw DJ, Fitzcharles M-A, Goldenberg DL, Häuser W, Katz RL, et al. 2016 Revisions to the 2010/2011 fibromyalgia diagnostic criteria. Semin Arthritis Rheum. 2016;46(3):319–29.

38. Bennett RM, Friend R, Jones KD, Ward R, Han BK, Ross RL. The Revised Fibromyalgia Impact Questionnaire (FIQR): validation and psychometric properties. Arthritis Res Ther. 2009;11(4):R120.

39. Häuser W, Jung E, Erbslöh-Möller B, Gesmann M, Kühn-Becker H, Petermann F, et al. Validation of the Fibromyalgia Survey Questionnaire within a cross-sectional survey. PLoS One. 2012;7(5):e37504.

40. Kang JH, Kim JK, Hong SH, Lee CH, Choi BY. Heart rate variability for quantification of autonomic dysfunction in fibromyalgia. Ann Rehabil Med. 2016;40(2):301–9.

41. Yagiz On A, Tanigor G, Aykanat Baydar D. Relationships of autonomic dysfunction with disease severity and neuropathic pain features in fibromyalgia: is it really a sympathetically maintained neuropathic pain? Korean J Pain. 2022;35(3):327–35.

53. Brevik EJ, Lundervold AJ, Haavik J, Posserud M-B. Validity and accuracy of the Adult Attention-Deficit/Hyperactivity Disorder (ADHD) Self-Report Scale (ASRS) and the Wender Utah Rating Scale (WURS) symptom checklists in discriminating between adults with and without ADHD. Brain Behav. 2020;10(6):e01605.

54. Kustow J. Hypermobility, immune dysfunction and dysautonomia cluster in ADHD. Eur Psychiatry. 2025;68(Suppl 1):S54.

55. Luu B, Fabiano N. ADHD as a circadian rhythm disorder: evidence and implications for chronotherapy. Front Psychiatry. 2025;16:1697900.

56. Attoe DE, Climie EA. Miss. Diagnosis: a systematic review of ADHD in adult women. J Atten Disord. 2023;27(7):645–57.

57. Bradlow RCJ, Armstrong F, Ogden E. Adult attention deficit hyperactivity disorder in Australia: how its current commercial model for diagnosis and treatment is encouraging misdiagnosis. Med J Aust. 2025;223(8):384–6.

58. Mendonsa RD, Jayasooriya HT. The bottleneck effect: wait times for adult ADHD assessment at a private clinic in Australia. Eur Psychiatry. 2025;68(Suppl 1):S792.

47. Longmore SK, Lui GY, Naik G, Breen PP, Jalaludin B, Gargiulo GD. A comparison of reflective photoplethysmography for detection of heart rate, blood oxygen saturation, and respiration rate at various anatomical locations. Sensors. 2019;19(8):1874.

48. Bent B, Goldstein BA, Kibbe WA, Dunn JP. Investigating sources of inaccuracy in wearable optical heart rate sensors. npj Digit Med. 2020;3(1):18.

49. Sjoding MW, Dickson RP, Iwashyna TJ, Gay SE, Valley TS. Racial bias in pulse oximetry measurement. N Engl J Med. 2020;383(25):2477–8.

50. Cao R, Azimi I, Sarhaddi F, Niela-Vilen H, Axelin A, Liljeberg P, et al. Accuracy assessment of Oura Ring nocturnal heart rate and heart rate variability in comparison with electrocardiography in time and frequency domains: comprehensive analysis. J Med Internet Res. 2022;24(1):e27487.

51. Charlton PH, Bonnici T, Tarassenko L, Clifton DA, Beale R, Watkinson PJ. An assessment of algorithms to estimate respiratory rate from the electrocardiogram and photoplethysmogram. Physiol Meas. 2016;37(4):610–26.

52. Mukkamala R, Stergiou GS, Avolio AP. Cuffless blood pressure measurement. Annu Rev Biomed Eng. 2022;24:203–30.

42. Smith R, Chin KD, Munzner T. HealthTale: a patient-centric health story visualization tool. IEEE Trans Vis Comput Graph. Forthcoming 2026. arXiv:2605.20207.

43. Lordon RJ, et al. How patient-generated health data and patient-reported outcomes affect patient–clinician relationships: a systematic review. Health Informatics J. 2020;26(4):2689–706.

44. West P, Van Kleek M, Giordano R, Weal MJ, Shadbolt N. Information quality challenges of patient-generated data in clinical practice. Front Public Health. 2017;5:284.

45. Cohen DJ, Keller SR, Hayes GR, Dorr DA, Ash JS, Sittig DF. Integrating patient-generated health data into clinical care settings or clinical decision-making: lessons learned from Project HealthDesign. JMIR Hum Factors. 2016;3(2):e26.

46. Rajabiyazdi F, Perin C, Oehlberg L, Carpendale S. Communicating patient health data: a wicked problem. IEEE Comput Graph Appl. 2021;41(6). arXiv:2110.07806.

59. May M, et al. Ecological momentary assessment methodology in chronic pain research: a systematic review. J Pain. 2018;19(7):699–716.

60. Kroenke K, Yu Z, Wu J, Kean J, Monahan PO. Operating characteristics of PROMIS four-item depression and anxiety scales in primary care patients with chronic pain. Pain Med. 2014;15(11):1892–901.

61. Yao L, Subramaniam K, Raja KM, Arunachalam A, Tran A, Pandey T, et al. Association of postural orthostatic tachycardia syndrome, hypermobility spectrum disorders, and mast cell activation syndrome in young patients; prevalence, overlap and response to therapy depends on the definition. Front Neurol. 2025;16:1513199.

62. Eaton-Fitch N, Johnston SC, Zalewski P, Staines D, Marshall-Gradisnik S. Health-related quality of life in patients with myalgic encephalomyelitis/chronic fatigue syndrome: an Australian cross-sectional study. Qual Life Res. 2020;29(6):1521–31.
