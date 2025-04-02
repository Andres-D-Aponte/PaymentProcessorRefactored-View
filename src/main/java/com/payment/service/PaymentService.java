package com.payment.service;

import com.payment.factory.PaymentProcessorFactory;
import com.payment.model.Payment;
import com.payment.processor.PaymentProcessor;

public class PaymentService {
    public double processPayment(String paymentType, double amount, String currency) {
        Payment payment = new Payment(amount, currency);
        PaymentProcessor processor = PaymentProcessorFactory.createProcessor(paymentType);
        return processor.processPayment(payment);
    }
}