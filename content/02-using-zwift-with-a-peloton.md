Title: Using Zwift with a Peloton - SmartSpin2k
Date: 2025-03-14 20:29
Category: General
Tags: zwift, peloton, smartspin2k, android
Slug: using-zwift-with-a-peloton
Author: Forest Dussault
Summary: How I use Zwift with my OG Peloton

Cycling is great, though not so great during a Canadian winter. I've wanted to try out the gamified cycling world of [Zwift](www.zwift.com) for some 
time now, alas, I do not own a trainer. 

I do however have an original Peloton bike... and the Peloton in theory has all the essential hardware to work with Zwift,
so we should be able to figure something out here, right?

Thanks to the hard work of a couple of talented folks, this process is relatively straightfoward for someone who 
likes to tinker. At a high level, what we need is the following:

1. A way to install or display Zwift on our Peloton
2. A way to send sensor data (cadence, power) from the Peloton to Zwift

Turns out that the [SmartSpin2k](https://www.smartspin2k.com/) solves this entirely!

## 1. Zwift + Peloton

Our first problem: how do we install Android apps on a Peloton? 

At its core, the Peloton is a big Android 
tablet slapped onto an exercise bike. Out of the box, users are not able to install other Android apps onto the Peloton. 
However, [Anthony Doud](https://github.com/doudar) has 
developed the excellent [OpenPelo](https://github.com/doudar/OpenPelo) tool, 
which allows us install a custom launcher and several other handy Android apps onto the Peloton. 
I followed the corresponding [YouTube tutorial](https://www.youtube.com/watch?v=Q5XIlXqa0Cg) without any issues and had 
my Peloton running the new launcher in about 20 minutes.

Ideally we'd be able to install the [Android Zwift app](https://play.google.com/store/apps/details?id=com.zwift.zwiftgame&hl=en_CA) on the Peloton, 
however the onboard storage of the original Peloton bike is too small to handle the Zwift installation.
Instead we can make use of the classic [Sunshine](https://github.com/LizardByte/Sunshine) + [Moonlight](https://github.com/moonlight-stream) setup to stream Zwift 
remotely from a desktop PC.
(_This incidentally is also how I stream games from my desktop PC to my Steam Deck - it works great_)

![Zwift on Peloton](/images/zwift-with-peloton/it_works.JPEG "Zwift streamed via Moonlight to the Peloton tablet")

## 2. Relaying Peloton sensor data to Zwift

The [SmartSpin2k](https://www.smartspin2k.com/) is at the heart of this setup. It's an awesome project developed 
by the aformentioned Anthony Doud. The SmartSpin2k is a 3D printed piece of hardware that reads from the Peloton cadence 
and power sensors, and acts as a Bluetooth device that can forward this data along to a connected device. 

![Sensor Connection](/images/zwift-with-peloton/sensor_connection.JPEG "Rerouting Peloton sensor data to the SmartSpin2k")

Crucially, it is also able to relay Zwift commands to a motor that can rotate the Peloton's resistance knob on your 
behalf. Once set up correctly, the SmartSpin2k will automatically adjust the Peloton's resistance according to the 
grade or ERG setup on the active Zwift course.

![SmartSpin2k](/images/zwift-with-peloton/smartspin2k.JPEG "SmartSpin2k motorized resistance controller")

![SmartSpin2k Shifter](/images/zwift-with-peloton/shifter.JPEG "SmartSpin2k gear shifter, allows for manual adjustments to resistance")

I bought mine from [eMadmanMakes](https://www.etsy.com/listing/1356903775/smartspin2k-v3-spin-bike-smart-trainer?etsrc=sdt), 
who 3D prints and assembles the devices for Canadian users. All in it was around $400 CAD, which had me hesitant at first, 
though now that I've been living with it for a few weeks I have no regrets. It's a well-made and functional tool.

Installation was very easy and took around 10 minutes. The [guide](https://docs.smartspin2k.com/documentation/configuration.html) is also quite comprehensive and covers several other 
potential configurations.

## Zwifting

Now that the setup is done, I can use my Peloton to Zwift! I can also still use the Peloton bike as a regular 
Peloton whenever I like, so there's been no loss in functionality. 

Zwift in general has been more fun for me than the Peloton cycling classes. It feels closer to a real bike ride, and I 
can listen to my own playlists instead of enduring whatever torturous tracks Peloton has licensed. The feeling of approaching an 
incline and having the SmartSpin2k automatically increase the resistance is very cool, and tricks my brain just enough to make me feel like 
I'm actually biking up a hill. It's great motivation to bike a little harder during a workout. 

## Miscellaneous irritations

While setting this up I suffered several indiginites and annoyances. I should stress that none of these were related to 
OpenPelo or the SmartSpin2k. Instead, these were issues unique to my home setup.  

Getting Zwift to connect to the SmartSpin2k required some finesse. A simple Bluetooth connection from the SmartSpin2K to my Desktop PC 
was not working for me. The connection was too sketchy, and the weak little USB Bluetooth adapter I have is simply not up 
for the task of connecting to a device 10 ft away.

![Bluetooth Adapater](/images/zwift-with-peloton/bluetooth_adapter.JPEG "An inadequate Bluetooth adapter")

Instead, I ended up connecting the SmartSpin2K to my iPhone via Bluetooth. Turns out there is a [mobile companion app](https://apps.apple.com/us/app/zwift-companion/id934083691) 
for Zwift (aptly named `Companion`) which is able to act as the intermediary between your sensors and Zwift. 
However, this app is only able to connect to Zwift 
**if the 2 applications are on the same WiFi network**. This took me some time to realize, and I struggled to get the 
companion app to connect to Zwift initially. 

For reasons I will detail in a later blog, my desktop PC is on a separate subnet and is connected to the Internet via 
an ethernet cable running to a switch. Thankfully I have a WiFi adapter set up on my PC, so I turned that 
network adapter on and voilà, Zwift and the Companion app could connect.

![WiFi Adapater](/images/zwift-with-peloton/wifi_adapter.JPEG "The WiFi adapter that saved the day")

However, the connection still intermittently drops out during rides. I'm not sure what's causing this instability. 
The interuptions last 1-2 seconds and aren't a dealbreaker, but they are a distraction during a ride.