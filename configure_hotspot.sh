#! /bin/bash

###  RESOURCE
# https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md#internet-sharing

### IMPORTANT!!
### NOTE: make sure to update /etc/network/interfaces
### ALSO: if wanting to revert this, it should be clear
### just make sure to remove static ip address in dhcpcd
### also... make sure to remove dnsmasq and default hostapd conf

### GIVE wlan0 a STATIC ip address
cat > /etc/dhcpcd.conf <<- EndOfMessage
interface wlan0
    static ip_address=192.168.4.1/24
EndOfMessage

sudo service dhcpcd restart

sleep 1

### CONFIGURE DHCP SERVER (dnsmasq)
sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig

## heredoc
cat > /etc/dnsmasq.conf <<- EndOfMessage
interface=wlan0      # Use the require wireless interface - usually wlan0
    dhcp-range=192.168.4.2,192.168.4.20,255.255.255.0,24h
EndOfMessage

### CONFIGURE the access point host software
# /etc/hostapd/hostapd.conf
cat > /etc/hostapd/hostapd.conf <<- EndOfMessage
interface=wlan0
driver=nl80211
ssid=ATTArdvark
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_passphrase=NotATurtle
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
EndOfMessage

## /etc/default/hostapd
cat > /etc/default/hostapd <<- EndOfMessage
DAEMON_CONF="/etc/hostapd/hostapd.conf"
EndOfMessage

sleep 1
sudo systemctl start hostapd
sudo systemctl start dnsmasq

## ADD ROUTING AND MASQUERADE
cat > /etc/sysctl.conf <<- EndOfMessage
net.ipv4.ip_forward=1
EndOfMessage

sudo iptables -t nat -A  POSTROUTING -o eth0 -j MASQUERADE
sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"

cat > /etc/rc.local <<- EndOfMessage
iptables-restore < /etc/iptables.ipv4.nat
EndOfMessage





