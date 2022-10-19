#!/bin/bash
eb list && eb use coffee-shop && eb deploy && chmod +x bin/eb_setenv.sh && bin/eb_setenv.sh